from db.base_class import Base
from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy.orm import relationship


class Genre(Base):
    id = Column(Integer, primary_key=True, index=True)
    description = Column(String)
    movies = relationship('Movie', secondary='moviegenre',back_populates='genres')





