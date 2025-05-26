from pydantic import BaseModel

class PitanjeCreate(BaseModel):
    pitanje: str
    tacan: str
    netacan1: str
    netacan2: str
