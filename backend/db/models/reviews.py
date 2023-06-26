from db.base_class import Base
from sqlalchemy import Column
from sqlalchemy import Date
from sqlalchemy import ForeignKey
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy.orm import relationship


class Review(Base):
    id = Column(Integer, primary_key=True, index=True)
    score = Column(Integer)
    description = Column(String)
    date = Column(Date)
    movie_id = Column(Integer, ForeignKey("movie.id"))
    movie = relationship("Movie", back_populates="reviews")
    user_id = Column(Integer, ForeignKey("user.id"))
    user = relationship("User", back_populates="reviews")