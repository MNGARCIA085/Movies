from db.base_class import Base
from sqlalchemy import Column, ForeignKey,Integer


class UserGroups(Base):
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('user.id'))
    group_id = Column(Integer, ForeignKey('groups.id'))

