from db.models.movies import Movie
from schemas.movies import MovieCreate,FilterMovie
from .movie_genres import create_movie_genres,delete_movie_genres
from sqlalchemy.orm import Session
from db.models.genres import Genre
from db.models.reviews import Review
from sqlalchemy import or_,and_


# create movie
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


# retrieve movie by id
def retreive_movie(id: int, db: Session):
    return db.query(Movie).filter(Movie.id == id).first()



#http://127.0.0.1:8000/movies/?date__lte=218-07-03&date__lte=2018-07-03
#http://127.0.0.1:8000/movies/?date__gte=2022-09-21&date__lte=2022-09-21#

def list_movies(db: Session,f:FilterMovie):

    filters = [Movie.id>0]

    if f.title:
        filters.append(Movie.title==f.title)

    if f.title__contains:
        filters.append(Movie.title.contains(f.title__contains))

    if f.genres:
        generos = db.query(Genre.id).filter(Genre.id.in_(f.genres))
        filters.append(Genre.id.in_(generos))

    # rango de fechas
    if f.date__gte:
        filters.append( Movie.date >=  f.date__gte)
    if f.date__lte:
        filters.append( Movie.date <=  f.date__lte)

    # junto todo
    filters = and_(*filters)
    
    query = db.query(Movie).join(Movie.genres).filter(filters).limit(f.limit).offset(f.offset-1).all()
     # le agrego count, page, limit
    count = db.query(Movie).filter(filters).count() # join en la cuenta??
    
    #
    data = [
        {
            'id':d.id,
            'title': d.title,
            'date': d.date,
            'description': d.description,
            'image_link':d.image_link,
            'genres': [{'description':t.description,'id':t.id} for t in d.genres]
        }
        for d in query
    ]



    # respuesta
    response = {
        'data': data,
        'count': count,
        'limit':f.limit,
        'offset':f.offset
    }
    return response






# update by id
def update_movie_by_id(id: int, movie: MovieCreate, db: Session):

    existing_movie = db.query(Movie).filter(Movie.id == id)
    if not existing_movie.first():
        return 0
    
    # actualizo la peli y sus géneros
    data = movie.dict(exclude_unset=True) # ipte
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



#movie_object = Movie(**movie.dict()); antes, sin tener que agregar en la otra tabla
#db.add(movie_object)