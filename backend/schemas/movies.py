from datetime import datetime,date
from typing import Optional,List
from fastapi import Query
from pydantic import BaseModel, Field
from datetime import date as dtdate
from .common import Pagination


# helper
class Review(BaseModel):
    score: int
    description: str
    date: Optional[datetime] = datetime.now().date()

    class Config:  # to convert non dict obj to json
        orm_mode = True



# helper for genres
class Genres(BaseModel):
    description: str

    class Config:
        orm_mode = True



# shared properties
class MovieBase(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    date: Optional[dtdate]
    #date: Optional[dtdate] = Field(default_factory=dtdate.today())




# this will be used to validate data while creating a movie
class MovieCreate(MovieBase):
    title: str
    description: str
    genres: List[int]


# this will be used to format the response
class ShowMovie(MovieBase):
    id: int
    reviews:  List[Review]
    genres: List[Genres]
    


    class Config:  # to convert non dict obj to json
        orm_mode = True



# for filtering
class FilterMovie(Pagination):
    title: str | None = None
    title__contains: str | None = None
    date: Optional[date]
    date__gte: Optional[date]
    date__lte: Optional[date]
    reviews_scores_range: Optional[List[int]] = Field(Query([]))
    genres: Optional[List[int]] = Field(Query([]))