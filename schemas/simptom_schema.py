from typing import List, Optional
from pydantic import BaseModel

class SimptomRead(BaseModel):
    simptom_id: int
    naziv: str
    