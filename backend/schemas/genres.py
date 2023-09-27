from typing import Optional
from pydantic import BaseModel,Field

from .common import Pagination



class Genre(BaseModel):
    #description: Optional[str] #
    description: str = Field(..., min_length=1, description="Required")


class GenreCreate(Genre):
    pass
    #description: str = Field(..., min_length=1, description="Required")



class ShowGenre(Genre):
    id:int
    description: str

    class Config:  # to convert non dict obj to json
        orm_mode = True

class FilterGenres(Pagination):
    description: Optional[str]  
    description__contains: Optional[str] 
