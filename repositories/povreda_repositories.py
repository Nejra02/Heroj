from sqlmodel import Session
from sqlalchemy.orm import Session
from models.povreda_model import Povreda
from models.povreda_simptom_model import Povreda_simptom

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

def get_povrede_by_simptom_id(db: Session, simptom_id: int):
    veze = db.query(Povreda_simptom).filter(Povreda_simptom.simptom_id == simptom_id).all()
    povrede = []
    for veza in veze:
        povreda = db.query(Povreda).filter(Povreda.povreda_id == veza.povreda_id).first()
        if povreda:
            povrede.append({
                "povreda_id": povreda.povreda_id,
                "naziv": povreda.naziv,
                "opis": povreda.opis
            })
    return povrede