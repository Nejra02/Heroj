from sqlmodel import SQLModel,Field

class Pitanja(SQLModel, table = True):
    pitanja_id: int | None = Field(default=None, primary_key=True)
    pitanje: str
    tacan: str
    netacan1: str
    netacan2: str

    
