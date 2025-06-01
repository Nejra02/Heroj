from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from repositories.simptom_repositories import get_simptom_by_id, get_simptom_by_name
from repositories.povreda_repositories import get_povrede_by_simptom_id
from schemas.simptom_schema import SimptomRead
from database import get_db
from schemas.povreda_schema import PovredaRead
from typing import List
from services.auth_service import get_current_user, get_current_user_optional
from models.user_simptom_model import User_simptom


router = APIRouter()

@router.get("/simptomi/search")
def search_simptom(
    s: str,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user_optional)  # Ovde omogućavamo GOSTE
):
    simptom = get_simptom_by_name(db, s)
    if not simptom:
        raise HTTPException(status_code=404, detail="Simptom nije pronađen.")

    if current_user and current_user.role == "user":
        user_simptom = User_simptom(user_id=current_user.user_id, simptom_id=simptom.simptom_id)
        db.add(user_simptom)
        db.commit()

    povrede = get_povrede_by_simptom_id(db, simptom.simptom_id)
    return povrede
