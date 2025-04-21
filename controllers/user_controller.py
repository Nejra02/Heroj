from contextlib import asynccontextmanager
from typing import Annotated

from database import engine
from fastapi import Depends, FastAPI, HTTPException, Query, APIRouter
from sqlmodel import Field, Session, SQLModel, create_engine, select
from services import user_service

def get_session():
  with Session(engine) as session:
    yield session

SessionDep = Annotated[Session, Depends(get_session)]

router = APIRouter()

@router.get("/")
def list_users(session: SessionDep, offset: int = 0, limit: int = 100):
  return user_service.get_users(session, offset, limit)
