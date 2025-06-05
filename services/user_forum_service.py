from repositories import user_forum_repository
from schemas.user_forum_schema import UserForumCreate
from sqlmodel import Session

def create_comment(db: Session, comment_data: UserForumCreate):
    return user_forum_repository.create_komentar(db, comment_data)


def get_comments_by_post_id(db: Session, post_id: int):
    return user_forum_repository.get_comments_by_post_id(db, post_id)
