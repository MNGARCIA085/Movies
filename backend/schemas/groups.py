from pydantic import BaseModel

class Group(BaseModel):
    description: str

class GroupCreate(Group):
    pass



