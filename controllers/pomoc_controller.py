from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from repositories.pomoc_repositories import get_pomoc_by_id, get_random_pomoci
from schemas.pomoc_schema import PomocRead
from database import get_db

router = APIRouter()

from repositories.pomoc_repositories import get_random_pomoci
from typing import List

@router.get("/pomoc/random", response_model=List[PomocRead])
def read_random_pomoci(
    db: Session = Depends(get_db)
):
    return get_random_pomoci(db)

@router.get("/pomoc/{pomoc_id}", response_model=PomocRead)
def read_pomoc(pomoc_id: int, db: Session = Depends(get_db)):
    pomoc = get_pomoc_by_id(db, pomoc_id)
    if not pomoc:
        raise HTTPException(status_code=404, detail="Pomoć nije pronađena")
    return pomoc

