from pydantic import BaseModel
from typing import Optional
from .common import Pagination

class Group(BaseModel):
    description: str

class GroupCreate(Group):
    pass

class ShowGroup(Group):
    id:int
    description: str

    class Config:  # to convert non dict obj to json
        orm_mode = True

class FilterGroups(Pagination):
    description: Optional[str]  
    description__contains: Optional[str] 

