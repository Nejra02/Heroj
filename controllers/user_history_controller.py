# controllers/user_history_controller.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from services import user_history_service

router = APIRouter()

@router.get("/user/{user_id}/history")
def get_user_search_history(user_id: int, db: Session = Depends(get_db)):
    return user_history_service.get_user_history(db, user_id)
