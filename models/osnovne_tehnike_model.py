from sqlmodel import SQLModel, Field

class OsnovneTehnike(SQLModel, table=True):
    osnovne_tehnike_id: int | None = Field(default=None, primary_key=True)
    naziv: str
    opis: str