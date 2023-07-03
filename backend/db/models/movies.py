from db.base_class import Base
from sqlalchemy import Column,LargeBinary,Date,Integer,String
from sqlalchemy.orm import relationship
from .movie_genre import MovieGenre
from .genres import Genre


class Movie(Base):
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    date = Column(Date)
    reviews = relationship("Review", back_populates="movie")
    genres = relationship('Genre', secondary='moviegenre',back_populates='movies')
    imagen = Column(LargeBinary)

