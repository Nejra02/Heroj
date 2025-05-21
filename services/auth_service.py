from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from repositories.user_repositories import get_user_by_username
from models.user_model import User
from datetime import datetime, timedelta

SECRET_KEY = "vY93KdX8zQbE1JwUa7ZplMxg4TNroHFtRwYcLmAeUi"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def create_access_token(data: dict, expires_delta: timedelta = None):
    encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    encode.update({"exp": expire})
    return jwt.encode(encode, SECRET_KEY, algorithm=ALGORITHM)

def verify_password(plain_password, hashed_password):
    return bcrypt_context.verify(plain_password, hashed_password)


def authenticate_user(email: str, password: str, db: Session):
    print("Email primljen:", email)
    user = db.query(User).filter(User.email == email).first()

    if not user or not verify_password(password, user.password):
        return None
    return user

