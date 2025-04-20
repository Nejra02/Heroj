from sqlmodel import SQLModel, Field

class User_povreda(SQLModel, table=True):
    user_povreda_id: int | None = Field(default=None, primary_key=True)
    user_id: int = Field(default=None, foreign_key="user.user_id")
    povreda_id: int = Field(default=None, foreign_key="povreda.povreda_id")
