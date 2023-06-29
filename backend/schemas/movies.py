from datetime import date
from datetime import datetime
from typing import Optional

from pydantic import BaseModel


# shared properties
class MovieBase(BaseModel):
    title: Optional[str] = None #title: Optional[str] = None
    description: Optional[str] = None
    #date: Optional[date] = datetime.now().date()
    # reviews


# this will be used to validate data while creating a Job
class MovieCreate(MovieBase):
    title: str
    description: str



# this will be used to format the response to not to have id,owner_id etc
class ShowMovie(MovieBase):
    id: int

    class Config:  # to convert non dict obj to json
        orm_mode = True
