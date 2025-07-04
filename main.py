from contextlib import asynccontextmanager
from typing import Annotated
from models import user_model,user_povreda_model,user_simptom_model,pitanja_model,pomoc_model,povreda_model,povreda_simptom_model,simptom_model, forum_model, user_forum_model, osnovne_tehnike_model, pristup_povredi_model, video_model
from database import engine
from fastapi import Depends, FastAPI, HTTPException, Query
from sqlmodel import Field, Session, SQLModel, create_engine, select

from controllers import user_controller, pomoc_controller, simptom_controller, povreda_controller, edukacija_controller, user_history_controller, pitanja_controller, auth, forum_controller, user_forum_controller

from fastapi.middleware.cors import CORSMiddleware


@asynccontextmanager
async def lifespan(app: FastAPI):
  create_db_and_tables()
  yield
  print("Gašenje aplikacije")

app = FastAPI(lifespan=lifespan)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
      "http://localhost:3000",
      "http://127.0.0.1:3000", 
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def create_db_and_tables():
  SQLModel.metadata.create_all(engine)

def get_session():
  with Session(engine) as session:
    yield session

SessionDep = Annotated[Session, Depends(get_session)]


app.include_router(auth.router)

app.include_router(user_controller.router, prefix="/users", tags=["Users"])
app.include_router(pomoc_controller.router)
app.include_router(simptom_controller.router)
app.include_router(povreda_controller.router)
app.include_router(edukacija_controller.router)
app.include_router(user_history_controller.router)
app.include_router(pitanja_controller.router)
app.include_router(forum_controller.router)
app.include_router(user_forum_controller.router)
