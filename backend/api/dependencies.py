from typing import List
from db.repository.users import get_groups_user
from api.v1.route_login import get_current_user_from_token # dsp. mover aquí
from schemas.users import User
from fastapi import Depends,HTTPException
from db.session import get_db
from sqlalchemy.orm import Session


# dependencia respecto a los grupos
class RoleChecker:
    def __init__(self, allowed_roles: List):
        self.allowed_roles = allowed_roles
 
    def __call__(self,user: User = Depends(get_current_user_from_token), db: Session = Depends(get_db)):
        # grupos a los que pertenece un usuario
        groups = get_groups_user(user.id,db)
        for a in self.allowed_roles:
            if a in groups:
                return user
        #logger.debug(f"User with role {user.role} not in {self.allowed_roles}")
        raise HTTPException(status_code=403, detail="Operation not permitted")