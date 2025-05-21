from sqlalchemy.orm import Session
from repositories import edukacija_repositories

def get_edukacija_sadrzaj(db: Session):
    osnovne = edukacija_repositories.get_osnovne_tehnike(db)
    povrede = edukacija_repositories.get_pristup_povredi(db)
    videi = edukacija_repositories.get_video_lekcije(db)

    return {
        "osnovne_tehnike": osnovne,
        "pristup_povredi": povrede,
        "videi": videi
    }
