
from sqlalchemy.orm import Session
from models.pitanja_model import Pitanja
from sqlmodel import Session, select

import random

def get_random_pitanja(db: Session, broj: int = 10):
    pitanja = db.query(Pitanja).all()
    random.shuffle(pitanja)
    return pitanja[:broj]



