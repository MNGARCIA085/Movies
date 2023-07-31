from db.base_class import Base
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship


class Groups(Base):
    #__tablename__ = 'groups'
    id = Column(Integer, primary_key=True, index=True)
    description = Column(String)
    users = relationship('User',secondary='usergroups',back_populates='groups') #back_populates='genres'




