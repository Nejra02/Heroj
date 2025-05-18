from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from services import pitanja_service

router = APIRouter()

@router.get("/kviz/pitanja")
def get_kviz(db: Session = Depends(get_db)): 
    return pitanja_service.get_kviz_pitanja(db)

