#from db.repository.users import create_new_user,get_users
from db.session import get_db
from fastapi import APIRouter
from fastapi import Depends
from schemas.users import ShowUser, UserCreate
from sqlalchemy.orm import Session


router = APIRouter()


@router.post("/", response_model=ShowUser)
def create_movie(user: UserCreate, db: Session = Depends(get_db)):
    from db.models.users import User
    #user = create_new_user(user=user, db=db)
    #return user
    fake_hashed_password = user.password + "notreallyhashed"
    db_user = User(username=user.username,email=user.email, hashed_password=fake_hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
    



#def get_movies(db: Session, skip: int = 0, limit: int = 100):
    #return db.query(movies.Movie).offset(skip).limit(limit).all()


@router.get("/")
def get_users(db: Session = Depends(get_db)):
    from db.models.users import User
    users = db.query(User).limit(20).all()
    print(users)
    #return {'a':4}
    return users
    #return get_users(db=db)
    #return db.query(movies.Movie).offset(skip).limit(limit).all()
    #user = create_new_user(user=user, db=db)
    #return user