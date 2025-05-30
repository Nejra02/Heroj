from sqlalchemy.orm import Session
from models.osnovne_tehnike_model import OsnovneTehnike
from models.pristup_povredi_model import PristupPovredi
from models.video_model import Video

def get_osnovne_tehnike(db: Session):
    return db.query(OsnovneTehnike).all()

def get_pristup_povredi(db: Session):
    return db.query(PristupPovredi).all()

def get_video_lekcije(db: Session):
    return db.query(Video).all()


def create_osnovna_tehnika(db, tehnika):
    nova_tehnika = OsnovneTehnike(naziv=tehnika.naziv, opis=tehnika.opis)
    db.add(nova_tehnika)
    db.commit()
    db.refresh(nova_tehnika)
    return nova_tehnika

def create_pristup_povredi(db, povreda):
    nova_povreda = PristupPovredi(naziv=povreda.naziv, opis=povreda.opis)
    db.add(nova_povreda)
    db.commit()
    db.refresh(nova_povreda)
    return nova_povreda

def create_video(db, video):
    novi_video = Video(link=video.link)
    db.add(novi_video)
    db.commit()
    db.refresh(novi_video)
    return novi_video