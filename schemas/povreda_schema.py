from typing import List, Optional
from pydantic import BaseModel

class PovredaRead(BaseModel):
    povreda_id: int
    naziv: str
    opis: str
    pomoc_id: int  

    class Config:
        orm_mode = True