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

