from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from repositories.pomoc_repositories import get_pomoc_by_id
from schemas.pomoc_schema import PomocRead
from database import get_db

router = APIRouter()

@router.get("/pomoc/{pomoc_id}", response_model=PomocRead)
def read_pomoc(pomoc_id: int, db: Session = Depends(get_db)):
    pomoc = get_pomoc_by_id(db, pomoc_id)
    if not pomoc:
        raise HTTPException(status_code=404, detail="Pomoć nije pronađena")
    return pomoc
