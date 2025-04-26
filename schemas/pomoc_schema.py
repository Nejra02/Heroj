from typing import List, Optional
from pydantic import BaseModel

class PomocRead(BaseModel):
    pomoc_id: int
    naziv: str
    koraci: List[str]  # lista formatiranih koraka

    class Config:
        orm_mode = True