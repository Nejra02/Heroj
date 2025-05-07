from typing import List
from pydantic import BaseModel, ConfigDict

class PomocRead(BaseModel):
    pomoc_id: int
    naziv: str
    koraci: List[str]

    @classmethod
    def from_orm(cls, obj):
        koraci = [korak.strip() for korak in obj.opis.split('|')]
        return cls(
            pomoc_id=obj.pomoc_id,
            naziv=obj.naziv,
            koraci=koraci
        )

    model_config = ConfigDict(from_attributes=True)