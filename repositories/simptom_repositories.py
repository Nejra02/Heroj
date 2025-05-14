from sqlmodel import Session
from models.simptom_model import Simptom

def get_simptom_by_id(db: Session, simptom_id: int):
    simptom = db.get(Simptom, simptom_id)
    if not simptom:
        return None
    # Split tekst po "|" i formatirati u "Korak 1: ..."
    
    return {
        "simptom_id": simptom.simptom_id,
        "naziv": simptom.naziv
        
    }

def get_simptom_by_name(db: Session, name: str):
    return db.query(Simptom).filter(Simptom.naziv.ilike(name)).first()