from db.repository.genres import create_new_genre,get_genres,update_genre_by_id,delete_genre_by_id,retreive_genre
from db.session import get_db
from fastapi import APIRouter, Depends, HTTPException,status
from schemas.genres import Genre,FilterGenres,GenreCreate,ShowGenre
from sqlalchemy.orm import Session


router = APIRouter()


# desc.


# POST
@router.post("/", status_code=201)
def create_genre(genre:Genre, db: Session = Depends(get_db)):
    return create_new_genre(genre=genre, db=db)

# GET
@router.get("/")
def get_all_genres(f:FilterGenres=Depends(),db: Session = Depends(get_db)):
    return get_genres(db=db,f=f)



# GENRE BY ID
@router.get(
    "/{id}",response_model=ShowGenre
)
def read_movie(id: int, db: Session = Depends(get_db)):
    movie = retreive_genre(id=id, db=db)
    if not movie:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Genre with this id {id} does not exist",
        )
    return movie


# UPDATE
@router.put("/{id}",status_code=201)
def update_genre(
                id: int, 
                genre: GenreCreate, 
                db: Session = Depends(get_db)):
    aux = update_genre_by_id(id=id, genre=genre, db=db)
    if not aux:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail=f"Genre with id {id} not found"
        )
    return {"msg": "Successfully updated data."}



# DELETE
@router.delete("/{id}")
def delete_genre(
    id: int,
    db: Session = Depends(get_db)
):
    genre = retreive_genre(id=id, db=db)
    if not genre:
        return HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Genre with id {id} does not exist",
        )
    # chequear que sólo pueda borrar un superusuario
    delete_genre_by_id(id=id, db=db)
    return {"detail": "Successfully deleted."}





