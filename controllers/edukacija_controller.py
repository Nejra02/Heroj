from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from schemas.edukacija_schema import EdukacijaResponse, OsnovnaTehnikaCreate, PristupPovrediCreate, VideoCreate
from services import edukacija_service

router = APIRouter()

@router.get("/edukacija", response_model=EdukacijaResponse)
def edukacija_endpoint(db: Session = Depends(get_db)):
    return edukacija_service.get_edukacija_sadrzaj(db)

@router.post("/edukacija/osnovne-tehnike")
def create_osnovna_tehnika(tehnika: OsnovnaTehnikaCreate, db: Session = Depends(get_db)):
    return edukacija_service.create_osnovna_tehnika(db, tehnika)

@router.post("/edukacija/pristup-povredi")
def create_pristup_povredi(povreda: PristupPovrediCreate, db: Session = Depends(get_db)):
    return edukacija_service.create_pristup_povredi(db, povreda)

@router.post("/edukacija/video")
def create_video(video: VideoCreate, db: Session = Depends(get_db)):
    return edukacija_service.create_video(db, video)
