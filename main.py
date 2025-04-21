from contextlib import asynccontextmanager
from typing import Annotated
from models import user_model,user_povreda_model,user_simptom_model,pitanja_model,pomoc_model,povreda_model,povreda_simptom_model,simptom_model
from database import engine
from fastapi import Depends, FastAPI, HTTPException, Query
from sqlmodel import Field, Session, SQLModel, create_engine, select
from controllers import user_controller


def create_db_and_tables():
  SQLModel.metadata.create_all(engine)


def get_session():
  with Session(engine) as session:
    yield session


SessionDep = Annotated[Session, Depends(get_session)]


@asynccontextmanager
async def lifespan(app: FastAPI):
  create_db_and_tables()
  yield
  print("Gašenje aplikacije")



app = FastAPI(lifespan=lifespan)

app.include_router(user_controller.router, prefix="/users", tags=["Users"])