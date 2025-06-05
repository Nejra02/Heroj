from sqlmodel import Session, select
from sqlalchemy.orm import selectinload
from models.forum_model import Forum
from models.user_forum_model import User_forum

def create_objava(db: Session, objava_data: dict) -> Forum:
    objava = Forum(**objava_data)
    db.add(objava)
    db.commit()
    db.refresh(objava)
    return objava

def get_all_objave(db: Session):
    statement = select(Forum).options(selectinload(Forum.komentari))
    return db.exec(statement).all()
