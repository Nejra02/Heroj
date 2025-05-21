from sqlalchemy.orm import Session
from repositories.pomoc_repositories import get_pomoc_for_povreda

def fetch_pomoc_for_povreda(db: Session, povreda_id: int):
    return get_pomoc_for_povreda(db, povreda_id)
