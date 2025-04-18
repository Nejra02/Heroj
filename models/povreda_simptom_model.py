from sqlmodel import SQLModel,Field

class Povreda_simptom(SQLModel, table = True):
    povreda_simptom_id: int | None = Field(default=None, primary_key=True)
    simptom_id: int = Field(default=None, foreign_key=True)
    povreda_id: int = Field(default=None, foreign_key=True)
