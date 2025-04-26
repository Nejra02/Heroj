from sqlmodel import Session
from models.pomoc_model import Pomoc

def get_pomoc_by_id(db: Session, pomoc_id: int):
    pomoc = db.get(Pomoc, pomoc_id)
    if not pomoc:
        return None
    # Split tekst po "|" i formatirati u "Korak 1: ..."
    koraci = [f"Korak {i+1}: {k.strip()}" for i, k in enumerate(pomoc.opis.split("|"))]
    return {
        "pomoc_id": pomoc.pomoc_id,
        "naziv": pomoc.naziv,
        "koraci": koraci
    }
