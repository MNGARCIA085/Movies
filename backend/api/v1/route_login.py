from datetime import timedelta
from api.utils import OAuth2PasswordBearerWithCookie
from core.config import settings
from core.hashing import Hasher
from core.security import create_access_token
from db.repository.login import get_user
from db.session import get_db
from fastapi import APIRouter, Depends, HTTPException,Response, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import jwt, JWTError
from schemas.tokens import Token
from sqlalchemy.orm import Session

# from fastapi.security import OAuth2PasswordBearer


router = APIRouter()


def authenticate_user(username: str, password: str, db: Session = Depends(get_db)):
    user = get_user(username=username, db=db)
    if not user:
        return False
    if not Hasher.verify_password(password, user.hashed_password):
        return False
    return user


@router.post("/token", response_model=Token)
def login_for_access_token(
    response: Response,
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    user = authenticate_user(form_data.username, form_data.password, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
        )
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)


    # mejorar dsp.
    if user.is_superuser:
        groups = 'admin'
    else:
        groups = 'std'

    access_token = create_access_token(
        data={"sub": user.username, "groups":groups}, expires_delta=access_token_expires
    )
    response.set_cookie(
        key="access_token", value=f"Bearer {access_token}", httponly=True
    )
    # voy a agregarle tmb. los grupos a los que pertenece el usuario
    return {"access_token": access_token, "token_type": "bearer"}




#oauth2_scheme = OAuth2PasswordBearerWithCookie(tokenUrl="/login/token")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login/token")


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
