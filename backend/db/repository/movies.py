from db.models.movies import Movie
from schemas.movies import MovieCreate
from .movie_genres import create_movie_genres,delete_movie_genres
from sqlalchemy.orm import Session


def create_new_movie(movie: MovieCreate,db: Session):
    # obtengo el dict; le separo los ids de los géneros y luego inserto apropiadamente
    data = movie.dict()
    genres = data.pop('genres')

    # agrego la peli
    movie_object = Movie(**data)
    db.add(movie_object)
    db.flush()

    # los géneros
    create_movie_genres(movie_object.id,genres,db)

    # commit
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
    
    # actualizo la peli y sus géneros
    data = movie.dict()
    genres = data.pop('genres')

    # géneros: borro los viejos y agrego los nuevos
    delete_movie_genres(id,db)
    create_movie_genres(id,genres,db)

    # la peli
    existing_movie.update(data)
    #existing_movie.update(movie.__dict__)
    db.commit()
    return 1


def delete_movie_by_id(id: int, db: Session):
    existing_movie = db.query(Movie).filter(Movie.id == id)
    if not existing_movie.first():
        return 0
    # borro sus géneros
    delete_movie_genres(movie_id=id,db=db)
    # borro la peli
    existing_movie.delete(synchronize_session=False) # ver esto
    db.commit()
    return 1



"""
def search_job(query: str, db: Session):
    jobs = db.query(Job).filter(Job.title.contains(query))
    return jobs
"""




#movie_object = Movie(**movie.dict()); antes, sin tener que agregar en la otra tabla
#db.add(movie_object)