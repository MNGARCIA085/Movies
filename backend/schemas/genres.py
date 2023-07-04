from typing import Optional
from pydantic import BaseModel



class Genre(BaseModel):
    description: Optional[str]


class GenreCreate(Genre):
    description: str

