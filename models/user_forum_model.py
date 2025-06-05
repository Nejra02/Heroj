from sqlmodel import SQLModel, Field
from sqlmodel import Relationship
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:
    from models.forum_model import Forum

class User_forum(SQLModel, table=True):
    komentar_id: int | None = Field(default=None, primary_key=True)
    user_id: int = Field(default=None, foreign_key="user.user_id")
    objava_id: int = Field(default=None, foreign_key="forum.objava_id")
    tekst_komentara: str
    forum: "Forum" = Relationship(back_populates="komentari")  