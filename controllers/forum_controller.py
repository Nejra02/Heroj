from fastapi import APIRouter, Depends
from sqlmodel import Session
from database import get_session
from services import forum_service
from schemas.forum_schema import ForumOut, ForumCreate
from typing import List

router = APIRouter()

@router.get("/forum/", response_model=List[ForumOut])
def get_forum_posts(db: Session = Depends(get_session)):
    return forum_service.get_all_objave(db)

@router.post("/forum/", response_model=ForumOut)
def create_forum_post(objava: ForumCreate, db: Session = Depends(get_session)):
    return forum_service.create_objava(db, objava.dict())
