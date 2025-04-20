from sqlmodel import SQLModel, Field

class Pomoc(SQLModel, table=True):
    pomoc_id: int | None = Field(default=None, primary_key=True)
    naziv: str
    opis: str
    povreda_id: int = Field(default=None, foreign_key="povreda.povreda_id")
