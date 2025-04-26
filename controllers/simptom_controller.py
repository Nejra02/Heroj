from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from repositories.simptom_repositories import get_simptom_by_id
from schemas.simptom_schema import SimptomRead
from database import get_db

router = APIRouter()

@router.get("/simptom/{simptom_id}", response_model=SimptomRead)
def read_simptom(simptom_id: int, db: Session = Depends(get_db)):
    simptom = get_simptom_by_id(db, simptom_id)
    if not simptom:
        raise HTTPException(status_code=404, detail="Simptom nije pronađen")
    return simptom
