import bcrypt
from sqlmodel import Session

from database import SessionLocal
from models.user_model import User

from repositories import user_repositories
from fastapi import HTTPException
from services.auth_service import bcrypt_context
from repositories.user_repositories import get_users_by_role

def get_users(session: Session, offset: int = 0, limit: int = 100) -> list[User]:
  return user_repositories.get_users(session, offset, limit)

def create_user_service(db: Session, user_data: dict):
    user_data["password"] = bcrypt_context.hash(user_data["password"])
    return user_repositories.create_user(db, user_data)

def is_password_hashed(password):
    # Pretpostavka: bcrypt hash počinje sa $2b$ i ima oko 60 karaktera
    return password.startswith('$2b$') and len(password) >= 60

def get_regular_users(db: Session):
    return get_users_by_role(db, role="user")