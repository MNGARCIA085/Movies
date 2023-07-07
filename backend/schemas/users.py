from pydantic import BaseModel
from pydantic import EmailStr
from .common import Pagination


# properties required during user creation
class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str
    is_superuser: bool = False


class ShowUser(BaseModel):
    username: str
    email: EmailStr
    is_active: bool

    class Config:  # to convert non dict obj to json
        orm_mode = True


# for filtering
class FilterUser(Pagination): #BaseModel
    username: str| None=None
    username__contains: str| None=None
    email: str | None = None
    email__contains: str | None = None


#fast api pag: https://uriyyo-fastapi-pagination.netlify.app/