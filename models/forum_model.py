from sqlmodel import SQLModel,Field
from typing import List
from sqlmodel import Relationship
from typing import Optional, List, TYPE_CHECKING

if TYPE_CHECKING:
    from models.user_forum_model import User_forum

class Forum(SQLModel, table = True):
    objava_id: int | None = Field(default=None, primary_key=True)
    tekst_objave: str
    komentari: List["User_forum"] = Relationship(back_populates="forum")