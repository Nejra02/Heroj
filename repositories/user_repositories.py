from sqlmodel import Session, select
from models.user_model import User

def get_users(session:Session, offset: int = 0, limit: int = 100) -> list[User]:
  return session.exec(select(User).offset(offset).limit(limit)).all()


def get_user_by_username(db: Session, username: str):
    return db.query(User).filter(User.username == username).first()

def create_user(db: Session, user_data: dict):
    db_user = User(**user_data)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
