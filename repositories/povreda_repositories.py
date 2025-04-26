from sqlmodel import Session
from models.povreda_model import Povreda

def get_povreda_by_id(db: Session, povreda_id: int):
    povreda = db.get(Povreda , povreda_id)
    if not povreda:
        return None
    
    return {
        "povreda_id": povreda.povreda_id,
        "naziv": povreda.naziv,
        "opis": povreda.opis,
        "pomoc_id": povreda.pomoc_id
    }
