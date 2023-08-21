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
    username: Optional[str]  
    username__contains: Optional[str] 
    email: Optional[str] 
    email__contains: Optional[str]
    first_name: Optional[str]
    first_name__contains: Optional[str]
    last_name: Optional[str] 
    last_name__contains: Optional[str] 


#fast api pag: https://uriyyo-fastapi-pagination.netlify.app/