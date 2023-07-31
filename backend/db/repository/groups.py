from sqlalchemy.orm import Session
from db.models.groups import Groups
from schemas.groups import GroupCreate

def create_new_group(group:GroupCreate, db: Session):
    group = Groups(**group.dict())
    db.add(group)
    db.commit()
    db.refresh(group)
    return group


def get_groups(db: Session):
    return db.query(Groups).all()


