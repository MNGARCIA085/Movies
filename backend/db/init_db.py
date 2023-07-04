from sqlalchemy.orm import Session

import schemas
from .repository import users,movies,reviews
from core.config import settings


# make sure all SQL Alchemy models are imported (app.db.base) before initializing DB
# otherwise, SQL Alchemy might fail to initialize relationships properly



from db.models.users import User
from db.models.movies import Movie
from db.models.reviews import Review
from db.models.genres import Genre
from db.models.movie_genre import MovieGenre








def init_db(db: Session) -> None:
    # Tables should be created with Alembic migrations
    # But if you don't want to use migrations, create
    # the tables un-commenting the next line
    # Base.metadata.create_all(bind=engine)




    # borro datos anteriores
    db.query(Movie).delete()
    db.query(User).delete()
    db.query(Review).delete()
    db.commit()



    user = users.get_user_by_email('bla@gmil.com',db) #settings.FIRST_SUPERUSER
    if not user:
        user_in = schemas.users.UserCreate(
            username='admin',
            email='bla@gmil.com',
            password='1234',
            is_superuser=True,
        )
        user = users.create_new_user(user_in,db)



    # ahora un poco más desprolijo, pero sólo me intersa cargar ciertos datos


    # standard users
    user_in = schemas.users.UserCreate(
            username='u1',
            email='u1@gmil.com',
            password='1234',
        )
    u1 = users.create_new_user(user_in,db)

    user_in = schemas.users.UserCreate(
            username='u2',
            email='u2@gmil.com',
            password='1234',
        )
    u2 = users.create_new_user(user_in,db)

    # genres
    db_genre = Genre(description='action')
    db.add(db_genre)
    db.commit()




    # movies
    movie_in = schemas.movies.MovieCreate(
        title='braveheart',
        description='dsfs, sdfdsf',
    )
    m1 = movies.create_new_movie(movie_in,db)
    movie_in = schemas.movies.MovieCreate(
        title='matrix reloaded',
        description='dsfs, sdfdsf'
    )
    m2 = movies.create_new_movie(movie_in,db)




    # genres for movies
    movie_genre_in = MovieGenre(movie_id=m1.id,genre_id=1)
    db.add(movie_genre_in)
    db.commit()

    movie_genre_in = MovieGenre(movie_id=m2.id,genre_id=1)
    db.add(movie_genre_in)
    db.commit()



    # reviews for movies
    review_in = schemas.reviews.ReviewCreate(
        score=5,
        description='love it',
        movie_id=m1.id,
    )
    reviews.create_new_review(review_in,u1.id,db)
    review_in = schemas.reviews.ReviewCreate(
        score=3,
        description='not bad',
        movie_id=m1.id,
    )
    reviews.create_new_review(review_in,u2.id,db)


    review_in = schemas.reviews.ReviewCreate(
        score=4,
        description='love it, great experience',
        movie_id=m2.id,
    )
    reviews.create_new_review(review_in,u2.id,db)