from sqlmodel import Session, select
from models.user_model import User

def get_users(session:Session, offset: int = 0, limit: int = 100) -> list[User]:
  return session.exec(select(User).offset(offset).limit(limit)).all()
