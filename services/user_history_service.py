
from sqlalchemy.orm import Session
from repositories import user_history_repositories

def get_user_history(db: Session, user_id: int):
    povrede = user_history_repositories.get_user_povrede(db, user_id)
    simptomi = user_history_repositories.get_user_simptomi(db, user_id)
    return {
        "povrede": povrede,
        "simptomi": simptomi
    }
