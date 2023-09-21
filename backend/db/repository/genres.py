from sqlalchemy.orm import Session
from db.models.genres import Genre
from schemas.genres import FilterGenres, GenreCreate
from sqlalchemy import or_,and_


def create_new_genre(genre:GenreCreate, db: Session):
    genre = Genre(**genre.dict())
    db.add(genre)
    db.commit()
    db.refresh(genre)
    return genre




# list all genres
def get_genres(db: Session, f:FilterGenres):
    filters = [Genre.id>0]
    if f.description:
        filters.append(Genre.description==f.description)
    if f.description__contains:
        filters.append(Genre.description.contains(f.description__contains))
    # junto todo
    filters = and_(*filters)
    # query
    query = db.query(Genre).filter(filters).limit(f.limit).offset(f.offset).all()
    # count
    count = db.query(Genre).filter(filters).count()
    # data
    data = [
        {
            'id':d.id,
            'description': d.description,
        }
        for d in query
    ]
    #
    response = {
        'data': data,
        'count': count,
        'limit':f.limit,
        'offset':f.offset
    }
    return response



# get genre by id
def retreive_genre(id: int, db: Session):
    return db.query(Genre).filter(Genre.id == id).first()



# update genre
def update_genre_by_id(id: int, genre:GenreCreate, db: Session):

    existing_genre = db.query(Genre).filter(Genre.id == id)
    if not existing_genre.first():
        return 0
    
    # actualizo la peli y sus géneros
    #data = genre.dict(exclude_unset=True) # ipte

    # update
    #existing_movie.update(data) 
    existing_genre.update(genre.__dict__)
    db.commit()
    return 1




# delete genre
def delete_genre_by_id(id: int, db: Session):
    existing_genre = db.query(Genre).filter(Genre.id == id)
    if not existing_genre.first():
        return 0
    # borro la peli
    existing_genre.delete(synchronize_session=False) # ver esto
    db.commit()
    return 1
    
    
