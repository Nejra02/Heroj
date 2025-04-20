from sqlmodel import SQLModel, Field

class Simptom(SQLModel, table=True):
    simptom_id: int | None = Field(default=None, primary_key=True)
    naziv: str
