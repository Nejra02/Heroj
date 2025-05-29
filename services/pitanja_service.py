from fastapi import HTTPException
from sqlalchemy.orm import Session
from repositories import pitanja_repositories
from sqlmodel import Session
from models.pitanja_model import Pitanja
from schemas.pitanja_schema import PitanjeCreate


def get_kviz_pitanja(db: Session):
    return pitanja_repositories.get_random_pitanja(db)


def create_question(pitanje: PitanjeCreate, db: Session):
    novo = Pitanja(**pitanje.dict())
    db.add(novo)
    db.commit()
    db.refresh(novo)
    return novo

def delete_question(pitanja_id: int, db: Session):
    pitanje = db.get(Pitanja, pitanja_id)
    if not pitanje:
        raise HTTPException(status_code=404, detail="Pitanje nije pronađeno")
    db.delete(pitanje)
    db.commit()
    return {"message": "Pitanje obrisano"}
