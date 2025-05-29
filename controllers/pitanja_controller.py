from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from services import pitanja_service
from schemas.pitanja_schema import PitanjeCreate
from models.pitanja_model import Pitanja

router = APIRouter()

@router.get("/kviz/pitanja")
def get_kviz(db: Session = Depends(get_db)): 
    return pitanja_service.get_kviz_pitanja(db)


@router.get("/", response_model=list[Pitanja])
def get_all(db: Session = Depends(get_db)):
    return pitanja_service.service_get_all(db)

@router.post("/kviz/pitanja")
def create_question(pitanje: PitanjeCreate, db: Session = Depends(get_db)):
    return pitanja_service.create_question(pitanje, db)

@router.delete("/kviz/pitanja/{pitanja_id}")
def delete_question(pitanja_id: int, db: Session = Depends(get_db)):
    return pitanja_service.delete_question(pitanja_id, db)
