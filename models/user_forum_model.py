from sqlmodel import SQLModel, Field

class User_forum(SQLModel, table=True):
    komentar_id: int | None = Field(default=None, primary_key=True)
    user_id: int = Field(default=None, foreign_key="user.user_id")
    objava_id: int = Field(default=None, foreign_key="forum.objava_id")
    tekst_komentara: str