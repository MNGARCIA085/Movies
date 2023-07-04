from db.repository.genres import create_new_genre,get_genres
from db.session import get_db
from fastapi import APIRouter
from fastapi import Depends
from schemas.genres import GenreCreate
from sqlalchemy.orm import Session




router = APIRouter()


@router.post("/", status_code=201)
def create_genre(genre:GenreCreate, db: Session = Depends(get_db)):
    return create_new_genre(genre=genre, db=db)



@router.get("/")
def get_all_genres(db: Session = Depends(get_db)):
    return get_genres(db=db)

