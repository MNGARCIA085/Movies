from pydantic import BaseModel,EmailStr,Field, validator
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
    username: str = Field(..., min_length=1, description="Required")
    first_name: str = Field(..., min_length=1, description="Required")
    last_name: str = Field(..., min_length=1, description="Required")
    email: EmailStr
    #groups:List[int] = [2]  # por default es std.

    class Config:
        orm_mode = True


#
class ShowUser(User):
    id: int
    is_active: bool
    groups: Optional[List[Groups]]

    class Config:
        orm_mode = True



# properties required during user creation
class UserCreate(User):
    password: str = Field(..., min_length=4)
    password2: str = Field(..., min_length=4)
    
    @validator('password2')
    def passwords_match(cls, v, values):
        if 'password' in values and v != values['password']:
            raise ValueError('Passwords do not match')
        return v
    
    is_superuser: bool = False




# update user
class UserUpdate(User):
    pass
    """
    si los quisiera opcionales
    username: str | None
    first_name: str | None
    last_name: str | None
    email: EmailStr | None
    """



# change password
class ChangePassword(BaseModel):
    password: str = Field(..., min_length=4)
    password2: str = Field(..., min_length=4)
    
    @validator('password2')
    def passwords_match(cls, v, values):
        if 'password' in values and v != values['password']:
            raise ValueError('Passwords do not match')
        return v
    




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