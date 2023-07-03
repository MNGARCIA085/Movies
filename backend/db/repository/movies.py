from db.models.movies import Movie
from schemas.movies import MovieCreate
from sqlalchemy.orm import Session


def create_new_movie(movie: MovieCreate,db: Session):
    # obtengo el dict; le separo los ids de los géneros y luego inserto apropiadamente
    movie_object = Movie(**movie.dict())
    db.add(movie_object)
    db.commit()
    db.refresh(movie_object)
    return movie_object


def retreive_movie(id: int, db: Session):
    return db.query(Movie).filter(Movie.id == id).first()



def list_movies(db: Session):
    return db.query(Movie).all()



def update_movie_by_id(id: int, movie: MovieCreate, db: Session):
    existing_movie = db.query(Movie).filter(Movie.id == id)
    if not existing_movie.first():
        return 0
    existing_movie.update(movie.__dict__)
    db.commit()
    return 1


def delete_movie_by_id(id: int, db: Session):
    existing_movie = db.query(Movie).filter(Movie.id == id)
    if not existing_movie.first():
        return 0
    existing_movie.delete(synchronize_session=False) # ver esto
    db.commit()
    return 1



"""
def search_job(query: str, db: Session):
    jobs = db.query(Job).filter(Job.title.contains(query))
    return jobs
"""