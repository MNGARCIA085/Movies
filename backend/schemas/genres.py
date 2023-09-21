from typing import Optional
from pydantic import BaseModel

from .common import Pagination



class Genre(BaseModel):
    description: Optional[str]


class GenreCreate(Genre):
    description: str

class ShowGenre(Genre):
    id:int
    description: str

    class Config:  # to convert non dict obj to json
        orm_mode = True

class FilterGenres(Pagination):
    description: Optional[str]  
    description__contains: Optional[str] 
