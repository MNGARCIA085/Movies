from sqlalchemy.orm import Session

import schemas
from .repository import users,movies,reviews,genres,groups
from core.config import settings


# make sure all SQL Alchemy models are imported (app.db.base) before initializing DB
# otherwise, SQL Alchemy might fail to initialize relationships properly



from db.models.users import User
from db.models.movies import Movie
from db.models.reviews import Review
from db.models.genres import Genre
from db.models.movie_genre import MovieGenre
from db.models.groups import Groups
from db.models.user_groups import UserGroups


 # more users with Faker
from faker import Faker
from sqlalchemy import insert
    
    
fake = Faker()




# large texts for descriptions

matrix_des = """
Thomas A. Anderson is a man living two lives. 
By day he is an average computer programmer and by night a hacker known as Neo. 
Neo has always questioned his reality, but the truth is far beyond his imagination. 
Neo finds himself targeted by the police when he is contacted by Morpheus, 
a legendary computer hacker branded a terrorist by the government. As a rebel against the machines, 
Neo must confront the agents:  super-powerful computer programs devoted to stopping Neo and 
the entire human rebellion.
"""


smile_des = """
After witnessing a bizarre, traumatic incident involving a patient, a psychiatrist 
becomes increasingly convinced she is being threatened by an uncanny entity.
Having spent years trying to flee her own childhood trauma by working her fingers 
to the bone, compassionate psychiatrist Dr Rose Cotter is used to treating 
the most damaged and vulnerable members of society. Laura's puzzling case, however, 
is a different story. And as unsuspecting Dr Cotter attempts to rationalise 
the dreadful delusions of the deeply disturbed young woman, hair-raising encounters 
with the unexplained cause the therapist to reconsider. Now she is losing her grip on reality. 
Can Rose deal with the ugly past and confront the smile, the unsettling grin of death?
"""






def init_db(db: Session) -> None:
    # Tables should be created with Alembic migrations
    # But if you don't want to use migrations, create
    # the tables un-commenting the next line
    # Base.metadata.create_all(bind=engine)

    # borro datos anteriores
    db.query(Movie).delete()
    db.query(User).delete()
    db.query(Review).delete()
    db.query(Genre).delete()
    db.query(MovieGenre).delete()
    db.query(Groups).delete()
    db.query(UserGroups).delete()
    db.commit()


    # GROUPS
    list_groups = ['admin','std']
    group_ids = []
    for l in list_groups:
        group = schemas.groups.GroupCreate(description=l)
        g = groups.create_new_group(group,db)
        group_ids.append(g.id)
 

    # USERS
    
    user = users.get_user_by_email('bla@gmil.com',db) #settings.FIRST_SUPERUSER
    if not user:
        user_in = schemas.users.UserCreate(
            username='admin',
            first_name='admin',
            last_name='admin',
            email='bla@gmil.com',
            password='1234',
            password2='1234',
            is_superuser=True,
        )
        user = users.create_new_user(user_in,db)
        # lo agrego a su grupo
        users.add_group_user(user.id,[group_ids[0]],db)



    # ahora un poco más desprolijo, pero sólo me intersa cargar ciertos datos


    # standard users
    user_in = schemas.users.UserCreate(
            username='u1',
            first_name='f1',
            last_name='ln1',
            email='u1@gmil.com',
            password='1234',
            password2='1234',
        )
    u1 = users.create_new_user(user_in,db)
    users.add_group_user(u1.id,[group_ids[1]],db)

    user_in = schemas.users.UserCreate(
            username='u2',
            first_name='f2',
            last_name='ln2',
            email='u2@gmil.com',
            password='1234',
            password2='1234',
        )
    u2 = users.create_new_user(user_in,db)
    users.add_group_user(u2.id,[group_ids[1]],db)



   
   # users with faker
    data_users = [
        users.create_new_user(schemas.users.UserCreate(
            username=fake.unique.user_name(), 
            first_name=fake.first_name(),
            last_name=fake.last_name(),
            email=fake.unique.email(), 
            password=1234,
            password2=1234),db)
        for i in range(50)
    ]

    
    """
    # users with faker
    data_users = [
        users.create_new_user(schemas.users.UserCreate(
            username=fake.unique.user_name(), 
            first_name=fake.first_name(),
            last_name=fake.last_name(),
            email=fake.unique.email(), 
            password=1234,
            password2=1234),db)
        for i in range(5)
    ]

    # bulk insert
    stmt = insert(User).values(data_users)
    db.execute(stmt)
    """





    # genres
    genre_in = schemas.genres.GenreCreate(description='action')
    g1 = genres.create_new_genre(genre=genre_in,db=db)
    genre_in = schemas.genres.GenreCreate(description='comedy')
    g2 = genres.create_new_genre(genre=genre_in,db=db)



    # movies
    movie_in = schemas.movies.MovieCreate(
        title='Smile',
        description=smile_des,
        genres=[g1.id,g2.id],
        date='2018-07-03',
        image_link='https://i0.wp.com/imgs.hipertextual.com/wp-content/uploads/2022/09/Smile.png?fit=1200%2C598&quality=50&strip=all&ssl=1',
    )
    m1 = movies.create_new_movie(movie_in,db)
    movie_in = schemas.movies.MovieCreate(
        title='matrix reloaded',
        description=matrix_des,
        genres=[g1.id],
        date='2016-07-03',
        image_link='https://www.slashfilm.com/img/gallery/the-wachowskis-wanted-the-matrix-trilogy-to-change-the-way-we-watch-movies/l-intro-1657156429.jpg'
    )
    m2 = movies.create_new_movie(movie_in,db)




    """
    # genres for movies
    movie_genre_in = MovieGenre(movie_id=m1.id,genre_id=1)
    db.add(movie_genre_in)
    db.commit()

    movie_genre_in = MovieGenre(movie_id=m2.id,genre_id=1)
    db.add(movie_genre_in)
    db.commit()

    """



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