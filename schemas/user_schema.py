from pydantic import BaseModel

class CreateUserRequest(BaseModel):
    ime: str
    prezime: str
    username: str
    email: str
    password: str
    role: str

class Token(BaseModel):
    access_token: str
    token_type: str
    role: str


class UserOut(BaseModel):
    user_id: int
    username: str
    email: str

    class Config:
        orm_mode = True