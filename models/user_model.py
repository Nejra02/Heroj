from sqlmodel import SQLModel,Field

class User(SQLModel, table = True):
    user_id: int | None = Field(default=None, primary_key=True)
    username: str
    password: str
    role : str
    email: str
