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
