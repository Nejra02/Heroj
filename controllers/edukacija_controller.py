from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from schemas.edukacija_schema import EdukacijaResponse
from services.edukacija_service import get_edukacija_sadrzaj

router = APIRouter()

@router.get("/edukacija", response_model=EdukacijaResponse)
def edukacija_endpoint(db: Session = Depends(get_db)):
    return get_edukacija_sadrzaj(db)
