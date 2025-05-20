from fastapi import APIRouter, Depends, status
from pydantic import BaseModel
from models import user_model
from passlib.context import CryptContext
from typing import Annotated
from database import SessionLocal
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from datetime import datetime,timedelta,timezone

router = APIRouter()
bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


SECRET_KEY = 'vY93KdX8zQbE1JwUa7ZplMxg4TNroHFtRwYcLmAeUi'
ALGORITHM = 'HS256'

@router.get("/auth/") #
async def get_auth():
    return {'user': "Autentifikacija"}

def create_access_token(username: str, user_id: int, expires_delta: timedelta = None):
    encode = {"sub": username, "user_id": user_id}
    expires = datetime.now(timezone.utc) + expires_delta
    encode.update({"exp": expires})
    return jwt.encode(encode, SECRET_KEY, algorithm=ALGORITHM)

def get_db():
    db= SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

def authenticate_user(username: str,password: str,db):
    user = db.query(user_model.User).filter(user_model.User.username == username).first()
    if not user:
        return False
    if not bcrypt_context.verify(password, user.password):
        return False
    return True


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
        username=create_user_request.username,
        email=create_user_request.email,
        password=bcrypt_context.hash(create_user_request.password),
        role=create_user_request.role,
        #is_active=True,
    )
    
    db.add(create_user_model)
    db.commit()
    db.refresh(create_user_model)
    return {"message": "User created successfully"}

@router.post("/token")
async def login_for_access_token(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], db: db_dependency):
    user = authenticate_user(form_data.username, form_data.password, db)
    print("Unesena šifra:",form_data.password)
    print("Hash iz baze:", user.password)
    print("Verifikacija:", bcrypt_context.verify(form_data.password, user.password))

    if not user:
        return "Failed authentication"

    return "successful authentication"