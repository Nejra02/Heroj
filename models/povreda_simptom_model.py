from sqlmodel import SQLModel, Field

class Povreda_simptom(SQLModel, table=True):
    povreda_simptom_id: int | None = Field(default=None, primary_key=True)
    simptom_id: int = Field(default=None, foreign_key="simptom.simptom_id")
    povreda_id: int = Field(default=None, foreign_key="povreda.povreda_id")
