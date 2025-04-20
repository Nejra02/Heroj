from sqlmodel import SQLModel, Field

class User_simptom(SQLModel, table=True):
    user_simptom_id: int | None = Field(default=None, primary_key=True)
    user_id: int = Field(default=None, foreign_key="user.user_id")
    simptom_id: int = Field(default=None, foreign_key="simptom.simptom_id")
