from sqlmodel import Session
from models.user_forum_model import User_forum

def create_komentar(db: Session, komentar_data: dict) -> User_forum:
    komentar = User_forum(**komentar_data)
    db.add(komentar)
    db.commit()
    db.refresh(komentar)
    return komentar
