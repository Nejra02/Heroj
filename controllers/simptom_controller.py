from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from repositories.simptom_repositories import get_simptom_by_id, get_simptom_by_name
from repositories.povreda_repositories import get_povrede_by_simptom_id
from schemas.simptom_schema import SimptomRead
from database import get_db
from schemas.povreda_schema import PovredaRead
from typing import List

router = APIRouter()

@router.get("/simptomi/search")
def search_simptom(s: str, db: Session = Depends(get_db)):
    simptom = get_simptom_by_name(db, s)
    if not simptom:
        raise HTTPException(status_code=404, detail="Simptom nije pronađen.")

    povrede = get_povrede_by_simptom_id(db, simptom.simptom_id)
    return povrede