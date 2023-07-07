from sqlalchemy import and_
from core.hashing import Hasher
from db.models.users import User
from schemas.users import UserCreate,FilterUser
from sqlalchemy.orm import Session


def create_new_user(user: UserCreate, db: Session):
    user = User(
        username=user.username,
        email=user.email,
        hashed_password=Hasher.get_password_hash(user.password),
        is_active=True,
        #is_superuser=False,
        is_superuser = user.is_superuser,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def get_user_by_email(email: str, db: Session):
    user = db.query(User).filter(User.email == email).first()
    return user


def get_users(db: Session,f:FilterUser):

    filters = []

    if f.username:
        filters.append(User.username==f.username)

    if f.username__contains:
        filters.append(User.username.contains(f.username__contains))

    if f.email:
        filters.append(User.email==f.email)

    if f.email__contains:
        filters.append(User.email.contains(f.email__contains))

    # junto todo
    filters = and_(*filters)

    # consulta
    users = db.query(User).filter(filters).limit(f.limit).offset(f.offset).all()
    return users

