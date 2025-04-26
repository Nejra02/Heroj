from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from repositories.povreda_repositories import get_povreda_by_id
from schemas.povreda_schema import PovredaRead
from database import get_db

router = APIRouter()

@router.get("/povreda/{povreda_id}", response_model=PovredaRead)
def read_pomoc(povreda_id: int, db: Session = Depends(get_db)):
    povreda = get_povreda_by_id(db, povreda_id)
    if not povreda:
        raise HTTPException(status_code=404, detail="Povreda nije pronađena")
    return povreda
