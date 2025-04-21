from sqlmodel import Session
from models.user_model import User
from repositories import user_repositories
from fastapi import HTTPException

def get_users(session: Session, offset: int = 0, limit: int = 100) -> list[User]:
  return user_repositories.get_users(session, offset, limit)