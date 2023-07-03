from datetime import date
from typing import List, Optional
from fastapi import Query
from pydantic import BaseModel, Field
from . import users
from datetime import datetime

# helper
class Movie(BaseModel):
    title: Optional[str]

    class Config:
        orm_mode = True


# shared properties
class ReviewBase(BaseModel):
    score: int
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

    class Config:  # to convert non dict obj to json
        orm_mode = True


# for filtering
class FilterReview(BaseModel):
    problematic: Optional[List[str]] = Field(Query([])) #https://github.com/tiangolo/fastapi/issues/4445
    movie_id:int | None = None
    movie_title:str | None = None
    movie_title__contains:str | None = None
    user_id:int | None = None



