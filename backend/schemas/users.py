from pydantic import BaseModel,EmailStr
from typing import List, Optional
from .common import Pagination


# groups
class Groups(BaseModel):
    id: int
    description:str

    class Config:
        orm_mode = True

# common properties
class User(BaseModel):
    id:int
    username: str
    first_name: str
    last_name: str
    email: EmailStr
    #groups:List[int] = [2]  # por default es std.

    class Config:
        orm_mode = True


#
class ShowUser(User):
    is_active: bool
    groups: Optional[List[Groups]]

    class Config:
        orm_mode = True



# properties required during user creation
class UserCreate(User):
    password: str
    is_superuser: bool = False


# for filtering
class FilterUser(Pagination):
    username: str| None=None
    username__contains: str| None=None
    email: str | None = None
    email__contains: str | None = None
    first_name: str| None=None
    first_name__contains: str| None=None
    last_name: str| None=None
    last_name__contains: str| None=None


#fast api pag: https://uriyyo-fastapi-pagination.netlify.app/