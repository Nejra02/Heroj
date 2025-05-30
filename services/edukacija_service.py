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


def create_osnovna_tehnika(db, tehnika):
    return edukacija_repositories.create_osnovna_tehnika(db, tehnika)

def create_pristup_povredi(db, povreda):
    return edukacija_repositories.create_pristup_povredi(db, povreda)

def create_video(db, video):
    return edukacija_repositories.create_video(db, video)