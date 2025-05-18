
from sqlalchemy.orm import Session
from repositories import pitanja_repositories

def get_kviz_pitanja(db: Session):
    return pitanja_repositories.get_random_pitanja(db)
