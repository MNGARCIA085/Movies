from datetime import datetime,date
from typing import Optional,List
from fastapi import Query
from pydantic import BaseModel, Field, constr
from datetime import date as dtdate
from .common import Pagination
from . import users

# helper
class Review(BaseModel):
    score: int
    description: str
    date: Optional[datetime] = datetime.now().date()
    user: users.ShowUser

    class Config:  # to convert non dict obj to json
        orm_mode = True



# helper for genres
class Genres(BaseModel):
    id: int
    description: str

    class Config:
        orm_mode = True



# shared properties
class MovieBase(BaseModel):
    title: str 
    description: Optional[str] = None
    date: Optional[dtdate]
    image_link: Optional[str] = None
    #date: Optional[dtdate] = Field(default_factory=dtdate.today())
    

# this will be used to validate data while creating a movie
class MovieCreate(MovieBase):
    title: str = Field(..., min_length=1, description="Required")
    description: str = Field(..., min_length=1)
    image_link: str = Field(..., min_length=1)
    #date: dtdate
    genres: List[int] #= constr(min_length=1)
    



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