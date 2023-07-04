from sqlalchemy.orm import Session
from db.models.genres import Genre
from schemas.genres import GenreCreate

def create_new_genre(genre:GenreCreate, db: Session):
    genre = Genre(**genre.dict())
    db.add(genre)
    db.commit()
    db.refresh(genre)
    return genre




def get_genres(db: Session):
    return db.query(Genre).all()


