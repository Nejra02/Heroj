from fastapi import APIRouter, Depends
from sqlmodel import Session
from database import get_session
from services import user_forum_service
from schemas.user_forum_schema import UserForumCreate
from fastapi import Request
from services.auth_service import get_current_user
from models.user_model import User

router = APIRouter()

@router.post("/user_forum/")
def create_comment(
    komentar: UserForumCreate,
    db: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    komentar_data = {
        "user_id": current_user.user_id,
        "objava_id": komentar.objava_id,
        "tekst_komentara": komentar.tekst_komentara
    }
    return user_forum_service.create_comment(db, komentar_data)
