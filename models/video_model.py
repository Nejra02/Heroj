from sqlmodel import SQLModel, Field

class Video(SQLModel, table=True):
    video_id: int | None = Field(default=None, primary_key=True)
    link: str
    