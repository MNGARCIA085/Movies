from db.base_class import Base
from sqlalchemy import Column
from sqlalchemy import Date
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy.orm import relationship


class Movie(Base):
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    date = Column(Date)
    reviews = relationship("Review", back_populates="movie")
    # genres

