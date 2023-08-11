from db.repository.groups import create_new_group, get_groups
from db.session import get_db
from fastapi import APIRouter, Depends
from schemas.groups import GroupCreate
from sqlalchemy.orm import Session


router = APIRouter()


@router.post("/", status_code=201)
def create_group(group:GroupCreate, db: Session = Depends(get_db)):
    return create_new_group(group=group, db=db)


@router.get("/")
def get_all_groups(db: Session = Depends(get_db)):
    return get_groups(db=db)

