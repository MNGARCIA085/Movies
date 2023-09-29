from pydantic import BaseModel,Field
from typing import Optional
from .common import Pagination

class Group(BaseModel):
    description: str = Field(..., min_length=1, description="Required")

class GroupCreate(Group):
    pass

class ShowGroup(Group):
    id:int


    class Config:  # to convert non dict obj to json
        orm_mode = True

class FilterGroups(Pagination):
    description: Optional[str]  
    description__contains: Optional[str] 

