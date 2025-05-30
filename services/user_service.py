import bcrypt
from sqlmodel import Session
from sqlalchemy.orm import Session
from database import SessionLocal
from models.user_model import User
from models.user_simptom_model import User_simptom
from models.simptom_model import Simptom

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
    return password.startswith('$2b$') and len(password) >= 60

def get_regular_users(db: Session):
    return get_users_by_role(db, role="user")


def get_user_dashboard_data(user_id: int, db: Session):
    user_simptoms = (
        db.query(Simptom.simptom_id, Simptom.naziv)
        .join(User_simptom, User_simptom.simptom_id == Simptom.simptom_id)
        .filter(User_simptom.user_id == user_id)
        .all()
    )
    return {
        "simptomi": [ {"simptom_id": s.simptom_id, "naziv": s.naziv} for s in user_simptoms ]    
    }