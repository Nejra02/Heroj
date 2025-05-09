from sqlmodel import SQLModel,Field

class Forum(SQLModel, table = True):
    objava_id: int | None = Field(default=None, primary_key=True)
    tekst_objave: str
    