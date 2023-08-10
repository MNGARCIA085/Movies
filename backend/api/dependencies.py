from typing import List
from db.repository.users import get_groups_user
from schemas.users import User
from fastapi import Depends,HTTPException,status
from db.session import get_db
from sqlalchemy.orm import Session
from jose import jwt, JWTError
from fastapi.security import OAuth2PasswordBearer
from db.repository.login import get_user
from core.config import settings



#oauth2_scheme = OAuth2PasswordBearerWithCookie(tokenUrl="/login/token")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login/token")


# obtener el usuario a partir del token
def get_current_user_from_token(
    token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
    )
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
        )
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = get_user(username=username, db=db)
    if user is None:
        raise credentials_exception
    return user


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