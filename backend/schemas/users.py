from pydantic import BaseModel
from pydantic import EmailStr
from .common import Pagination


# properties required during user creation
class UserCreate(BaseModel):
    username: str
    first_name: str
    last_name: str
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