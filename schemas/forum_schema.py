from typing import List
from pydantic import BaseModel

class KomentarOut(BaseModel):
    komentar_id: int
    tekst_komentara: str
    user_id: int

    class Config:
        orm_mode = True

class ForumOut(BaseModel):
    objava_id: int
    tekst_objave: str
    komentari: List[KomentarOut] = []

    class Config:
        orm_mode = True

class ForumCreate(BaseModel):
    tekst_objave: str
