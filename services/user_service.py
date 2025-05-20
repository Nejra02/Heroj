from sqlmodel import Session
from sqlalchemy.orm import Session
from models.user_model import User
from repositories import user_repositories
from fastapi import HTTPException
from services.auth_service import bcrypt_context

def get_users(session: Session, offset: int = 0, limit: int = 100) -> list[User]:
  return user_repositories.get_users(session, offset, limit)

def create_user_service(db: Session, user_data: dict):
    user_data["password"] = bcrypt_context.hash(user_data["password"])
    return user_repositories.create_user(db, user_data)
