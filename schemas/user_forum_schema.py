from pydantic import BaseModel

class UserForumCreate(BaseModel):
    objava_id: int
    tekst_komentara: str
