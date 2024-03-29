import os
import sys
from typing import Any
from typing import Generator

import pytest
from fastapi import FastAPI
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from sqlalchemy.orm import sessionmaker

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
# this is to include backend dir in sys.path so that we can import from db,main.py

from db.base import Base
from db.session import get_db
from api.base import api_router
from core.config import settings


# paar crear un nuevo usuario
from db.models.users import User

# nuevo género
from db.models.genres import Genre

# nueva peli
from db.models.movies import Movie

# para las rutas que requieren auth
from tests.utils import authentication_token_from_email



def start_application():
    app = FastAPI()
    app.include_router(api_router)
    return app


SQLALCHEMY_DATABASE_URL = "sqlite:///./test_db.db"
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
# Use connect_args parameter only with sqlite
SessionTesting = sessionmaker(autocommit=False, autoflush=False, bind=engine)


@pytest.fixture(scope="function") # module
def app() -> Generator[FastAPI, Any, None]:
    """
    Create a fresh database on each test case.
    """
    Base.metadata.create_all(engine)  # Create the tables.
    _app = start_application()
    yield _app
    Base.metadata.drop_all(engine)


@pytest.fixture(scope="function")
def db_session(app: FastAPI) -> Generator[SessionTesting, Any, None]:
    connection = engine.connect()
    transaction = connection.begin()
    session = SessionTesting(bind=connection)
    yield session  # use the session in tests.
    session.close()
    transaction.rollback()
    connection.close()


@pytest.fixture(scope="function")
def client(
    app: FastAPI, db_session: SessionTesting
) -> Generator[TestClient, Any, None]:
    """
    Create a new FastAPI TestClient that uses the `db_session` fixture to override
    the `get_db` dependency that is injected into routes.
    """

    def _get_test_db():
        try:
            yield db_session
        finally:
            pass

    app.dependency_overrides[get_db] = _get_test_db
    with TestClient(app) as client:
        yield client



# fixture para agregar un usuario (quizás luego en un lugar separado)
@pytest.fixture(scope='function')
def add_user(db_session:SessionTesting):
    def _add_user(username,first_name, last_name,email,password):
        db_user = User(username=username,
                       first_name=first_name,
                       last_name=last_name,
                       email=email, 
                       hashed_password=password)
        db_session.add(db_user)
        db_session.commit()
        db_session.refresh(db_user)

        return db_user
    return _add_user



# crear un género para poder ingresar una peli
# fixture para agregar un usuario (quizás luego en un lugar separado)
@pytest.fixture(scope='function')
def add_genre(db_session:SessionTesting):
    def _add_genre(description):
        db_genre = Genre(description=description)
        db_session.add(db_genre)
        db_session.commit()
        db_session.refresh(db_genre)
        return db_genre
    return _add_genre




# crear una peli (para usar luego con las reviews)
@pytest.fixture(scope='function')
def add_movie(db_session:SessionTesting):
    def _add_movie(title,description,date,image_link,genres):
        db_movie = Movie(
                            title=title,
                            description=description,
                            date=date,
                            image_link=image_link,
                            #genres=genres
                        )
        db_movie.genres = genres
        db_session.add(db_movie)
        db_session.commit()
        db_session.refresh(db_movie)
        return db_movie
    return _add_movie




# admin token
@pytest.fixture(scope="function")
def admin_user_token_headers(client: TestClient, db_session: Session):
    aux = authentication_token_from_email(
        client=client, email='admin@mail.com', rol='admin',db=db_session
    )
    return aux
    





# normal user token
@pytest.fixture(scope="function")
def normal_user_token_headers(client: TestClient, db_session: Session):
    return authentication_token_from_email(
        client=client, email='std@mail.com', rol='std', db=db_session
    )
