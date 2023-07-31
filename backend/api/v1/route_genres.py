from db.repository.genres import create_new_genre,get_genres
from db.session import get_db
from fastapi import APIRouter, Depends
from schemas.groups import Group
from sqlalchemy.orm import Session


router = APIRouter()


@router.post("/", status_code=201)
def create_genre(genre:Group, db: Session = Depends(get_db)):
    return create_new_genre(genre=genre, db=db)


@router.get("/")
def get_all_groups(db: Session = Depends(get_db)):
    return get_genres(db=db)

