from datetime import date
from typing import List, Optional
from fastapi import Query
from pydantic import BaseModel, Field, validator
from . import users
from datetime import datetime
from .common import Pagination

# helper
class Movie(BaseModel):
    title: Optional[str]

    class Config:
        orm_mode = True


# shared properties
class ReviewBase(BaseModel):
    score: int

    @validator('score')
    def validate_score(cls, value):
        if value < 1 or value > 5:
            raise ValueError('Choose a value between 1 and 5')
        return value

    description: str
    #date: Optional[date]
    date: datetime = Field(default_factory=datetime.now)


# create review
class ReviewCreate(ReviewBase):
    movie_id: int


# view review
class ShowReview(ReviewBase):
    id: int
    user: users.ShowUser
    movie: Movie
    date: datetime



    class Config:  # to convert non dict obj to json
        orm_mode = True


# for filtering
class FilterReview(Pagination):
    score: Optional[List[str]] = Field(Query([])) #https://github.com/tiangolo/fastapi/issues/4445
    movie_id:int | None = None
    movie_title:str | None = None
    movie_title__contains:str | None = None
    user_id:int | None = None
    date:Optional[date]
    date__gte:Optional[date]
    date__lte:Optional[date]



