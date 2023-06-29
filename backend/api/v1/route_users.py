from db.repository.users import create_new_user,get_users
from db.session import get_db
from fastapi import APIRouter
from fastapi import Depends
from schemas.users import ShowUser
from schemas.users import UserCreate
from sqlalchemy.orm import Session


from typing import List

router = APIRouter()


@router.post("/", response_model=ShowUser,  status_code=201)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    return create_new_user(user=user, db=db)



@router.get("/") #,response_model=List[ShowUser]
def get_all_users(db: Session = Depends(get_db)):
    return get_users(db=db)

