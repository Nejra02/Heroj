from pydantic import BaseModel

class UserSimptomOut(BaseModel):
    simptom_id: int
    naziv: str