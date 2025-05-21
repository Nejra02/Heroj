from pydantic import BaseModel

class UserPovredaOut(BaseModel):
    povreda_id: int
    naziv: str
    opis: str