from fastapi import APIRouter, Depends, HTTPException, status, Response
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from services.auth_service import authenticate_user, create_access_token
from services.user_service import create_user_service
from schemas.user_schema import CreateUserRequest, Token
from database import SessionLocal

router = APIRouter(prefix='/auth', tags=["auth"], responses={401: {"description": "Not authorized"}})

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register_user(create_user_request: CreateUserRequest, db: Session = Depends(get_db)):
    user_data = create_user_request.model_dump()
    new_user = create_user_service(db, user_data)
    return {"message": "User created successfully", "user": new_user}

@router.post("/token", response_model=Token)
async def login_for_access_token(response: Response, form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(form_data.username, form_data.password, db)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    
    access_token = create_access_token(data={"sub": user.username, "user_id": user.user_id})
    response.set_cookie(key="access_token", value=access_token, httponly=True)
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/logout")
async def logout(response: Response):
    response.delete_cookie(key="access_token")
    return {"message": "Logged out successfully"}
