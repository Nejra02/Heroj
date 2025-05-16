from fastapi import APIRouter, Depends, status
from pydantic import BaseModel
from models import user_model
from passlib.context import CryptContext
from typing import Annotated
from database import SessionLocal
from sqlalchemy.orm import Session


router = APIRouter()
bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_db():
    db= SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]


class CreateUserRequest(BaseModel):
    ime: str
    prezime: str
    username: str
    email: str
    password: str
    role: str

@router.post("/auth",status_code=status.HTTP_201_CREATED)
async def create_user(db: db_dependency, create_user_request: CreateUserRequest):
    create_user_model= user_model.User(
        ime=create_user_request.ime,
        prezime=create_user_request.prezime,
        username=create_user_request.ime + " " + create_user_request.prezime,
        email=create_user_request.email,
        password=bcrypt_context.hash(create_user_request.password),
        role=create_user_request.role,
        #is_active=True,
    )


    db.add(create_user_model)
    db.commit()
    db.refresh(create_user_model)
