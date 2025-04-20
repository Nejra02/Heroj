from sqlmodel import SQLModel, Field

class Povreda(SQLModel, table=True):
    povreda_id: int | None = Field(default=None, primary_key=True)
    naziv: str
    opis: str
    pomoc_id: int = Field(default=None, foreign_key="pomoc.pomoc_id")
