from datetime import date
from datetime import datetime
from typing import Optional,List
from pydantic import BaseModel





# helper
class Review(BaseModel):
    score: int
    description: str
    date: Optional[date]

    class Config:  # to convert non dict obj to json
        orm_mode = True



# shared properties
class MovieBase(BaseModel):
    title: Optional[str] = None #title: Optional[str] = None
    description: Optional[str] = None
    #date: Optional[date] = datetime.now().date()
    reviews:  List[Review]


# this will be used to validate data while creating a movie
class MovieCreate(MovieBase):
    title: str
    description: str


# this will be used to format the response
class ShowMovie(MovieBase):
    id: int

    class Config:  # to convert non dict obj to json
        orm_mode = True
