from datetime import date
from typing import Optional

from pydantic import BaseModel


from . import users



# helper
class Movie(BaseModel):
    title: Optional[str]

    class Config:
        orm_mode = True



# shared properties
class ReviewBase(BaseModel):
    score: int
    description: str
    date: Optional[date]


# create review
class ReviewCreate(ReviewBase):
    movie_id: int


# view review
class ShowReview(ReviewBase):
    id: int
    user: users.ShowUser
    movie: Movie

    class Config:  # to convert non dict obj to json
        orm_mode = True