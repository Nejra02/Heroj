from contextlib import asynccontextmanager
from typing import Annotated
from database import get_db

from database import engine
from services.user_service import get_user_dashboard_data
from services.auth_service import get_current_user
from fastapi import Depends, FastAPI, HTTPException, Query, APIRouter
from sqlmodel import Field, Session, SQLModel, create_engine, select
from services import user_service
from services.user_service import get_regular_users
from schemas.user_schema import UserOut

def get_session():
  with Session(engine) as session:
    yield session

SessionDep = Annotated[Session, Depends(get_session)]

router = APIRouter()


@router.get("/", response_model=list[UserOut])
def get_all_regular_users(db: SessionDep):
    return get_regular_users(db)

@router.get("/dashboard-data")
def get_dashboard_data(current_user = Depends(get_current_user), db: Session = Depends(get_db)):
    data = get_user_dashboard_data(current_user.user_id, db)
    return {
        
        "simptomi": data["simptomi"]
    }

@router.get("/me")
def get_current_user_info(current_user = Depends(get_current_user)):
    return {
        "user_id": current_user.user_id,
        "username": current_user.username,
        "email": current_user.email,
        "role": current_user.role
    }