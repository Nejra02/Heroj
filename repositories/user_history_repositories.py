
from sqlalchemy.orm import Session
from models.user_povreda_model import User_povreda
from models.user_simptom_model import User_simptom
from models.povreda_model import Povreda
from models.simptom_model import Simptom

def get_user_povrede(db: Session, user_id: int):
    return (
        db.query(Povreda)
        .join(User_povreda, User_povreda.povreda_id == Povreda.povreda_id)
        .filter(User_povreda.user_id == user_id)
        .all()
    )

def get_user_simptomi(db: Session, user_id: int):
    return (
        db.query(Simptom)
        .join(User_simptom, User_simptom.simptom_id == Simptom.simptom_id)
        .filter(User_simptom.user_id == user_id)
        .all()
    )
