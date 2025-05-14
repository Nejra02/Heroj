from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from repositories.povreda_repositories import get_povreda_by_id
from schemas.povreda_schema import PovredaRead
from database import get_db
from models.povreda_model import Povreda
from models.pomoc_model import Pomoc
from typing import List

router = APIRouter()

@router.get("/povreda/{povreda_id}", response_model=PovredaRead)
def read_pomoc(povreda_id: int, db: Session = Depends(get_db)):
    povreda = get_povreda_by_id(db, povreda_id)
    if not povreda:
        raise HTTPException(status_code=404, detail="Povreda nije pronađena")
    return povreda

@router.get("/povrede", response_model=List[PovredaRead])
def get_all_povrede(db: Session = Depends(get_db)):
    return db.query(Povreda).all()

@router.get("/povrede/{povreda_id}")
def get_povreda_detail(povreda_id: int, db: Session = Depends(get_db)):
    from models.povreda_model import Povreda
    from models.pomoc_model import Pomoc

    povreda = db.query(Povreda).filter(Povreda.povreda_id == povreda_id).first()
    if not povreda:
        raise HTTPException(status_code=404, detail="Povreda nije pronađena.")

    pomoc = db.query(Pomoc).filter(Pomoc.pomoc_id == povreda.pomoc_id).first()
    if not pomoc:
        raise HTTPException(status_code=404, detail="Pomoć nije pronađena.")

    koraci = [korak.strip() for korak in pomoc.opis.split("|") if korak.strip()]

    return {
        "povreda_id": povreda.povreda_id,
        "naziv": povreda.naziv,
        "opis": povreda.opis,
        "pomoc": {
            "naziv": pomoc.naziv,
            "koraci": koraci
        }
    }
