from pydantic import BaseModel

class OsnovnaTehnikaRead(BaseModel):
    osnovne_tehnike_id: int
    naziv: str
    opis: str

    class Config:
        orm_mode = True

class PristupPovrediRead(BaseModel):
    pristup_povredi_id: int
    naziv: str
    opis: str

    class Config:
        orm_mode = True

class VideoRead(BaseModel):
    video_id: int
    link: str

    class Config:
        orm_mode = True

class EdukacijaResponse(BaseModel):
    osnovne_tehnike: list[OsnovnaTehnikaRead]
    pristup_povredi: list[PristupPovrediRead]
    videi: list[VideoRead]

class OsnovnaTehnikaCreate(BaseModel):
    naziv: str
    opis: str

class PristupPovrediCreate(BaseModel):
    naziv: str
    opis: str

class VideoCreate(BaseModel):
    link: str
