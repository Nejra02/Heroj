from sqlmodel import SQLModel, Field

class PristupPovredi(SQLModel, table=True):
    pristup_povredi_id: int | None = Field(default=None, primary_key=True)
    naziv: str
    opis: str