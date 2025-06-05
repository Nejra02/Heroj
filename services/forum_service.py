from repositories import forum_repository

def create_objava(db, objava_data):
    return forum_repository.create_objava(db, objava_data)

def get_all_objave(db):
    return forum_repository.get_all_objave(db)
