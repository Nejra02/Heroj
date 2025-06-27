from sqlmodel import SQLModel, Field
from typing import Optional
import bcrypt

class User(SQLModel, table=True):
    user_id: Optional[int] = Field(default=None, primary_key=True)
    username: str
    password: str 
    role: str
    email: str

    @property
    def plain_password(self):
        raise AttributeError("Lozinka se ne može čitati u običnom tekstu.")

    @plain_password.setter
    def plain_password(self, plain_text: str):
        if not plain_text.startswith("$2b$"):
            hashed = bcrypt.hashpw(plain_text.encode(), bcrypt.gensalt())
            self.password = hashed.decode()
        else:
            self.password = plain_text
