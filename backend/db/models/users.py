from db.base_class import Base
from sqlalchemy import Boolean,LargeBinary
from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy.orm import relationship
#from .groups import Groups
#from .user_groups import UserGroups


class User(Base):
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, nullable=False)
    first_name = Column(String)
    last_name = Column(String)
    email = Column(String, nullable=False, unique=True, index=True)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean(), default=True)
    is_superuser = Column(Boolean(), default=False)
    reviews = relationship("Review", back_populates="user")
    imagen = Column(LargeBinary)
    groups = relationship('Groups',secondary='usergroups',back_populates='users')




