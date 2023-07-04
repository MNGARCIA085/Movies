from db.base_class import Base
from sqlalchemy import Column, ForeignKey,Integer



class MovieGenre(Base):
    id = Column(Integer, primary_key=True, index=True)
    movie_id = Column(Integer, ForeignKey('movie.id'))
    genre_id = Column(Integer, ForeignKey('genre.id'))


