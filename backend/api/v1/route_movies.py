from typing import List
from db.repository.movies import create_new_movie,retreive_movie,delete_movie_by_id,update_movie_by_id,list_movies
from db.session import get_db
from fastapi import APIRouter, Depends, HTTPException,status
from schemas.movies import MovieCreate,ShowMovie,FilterMovie
from sqlalchemy.orm import Session
from api.dependencies import RoleChecker
from db.models.users import User


router = APIRouter()


allow_create_resource = RoleChecker(['admin']) # quizás dsp. por id


#https://stackoverflow.com/questions/69950072/pydantic-params-validation-with-file-upload
# cant combine

@router.post("/", response_model=ShowMovie,status_code=201)
def create_movie(
    movie: MovieCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(allow_create_resource),
):
    movie = create_new_movie(movie=movie,db=db)
    return movie


@router.get(
    "/{id}", response_model=ShowMovie
)
def read_movie(id: int, db: Session = Depends(get_db)):
    movie = retreive_movie(id=id, db=db)
    if not movie:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Movie with this id {id} does not exist",
        )
    return movie


@router.get("/") #, response_model=List[ShowMovie]
def read_movies(f: FilterMovie = Depends(),db: Session = Depends(get_db)):
    return list_movies(db=db,f=f)

@router.put("/{id}",status_code=201)
def update_movie(
                id: int, 
                movie: MovieCreate, 
                db: Session = Depends(get_db),
                current_user: User = Depends(allow_create_resource)):
    aux = update_movie_by_id(id=id, movie=movie, db=db)
    if not aux:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail=f"Movie with id {id} not found"
        )
    return {"msg": "Successfully updated data."}


@router.delete("/{id}")
def delete_movie(
    id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(allow_create_resource)
):
    movie = retreive_movie(id=id, db=db)
    if not movie:
        return HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Movie with id {id} does not exist",
        )
    # chequear que sólo pueda borrar un superusuario
    delete_movie_by_id(id=id, db=db)
    return {"detail": "Successfully deleted."}



