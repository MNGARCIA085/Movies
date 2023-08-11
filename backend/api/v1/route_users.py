from db.repository.users import get_user,create_new_user,get_users, add_group_user,get_user,change_state_user_by_id
from db.session import get_db
from fastapi import APIRouter,Depends
from schemas.users import ShowUser,FilterUser,UserCreate
from sqlalchemy.orm import Session
from typing import List

router = APIRouter()


# create new user
@router.post("/", response_model=ShowUser,  status_code=201)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    return create_new_user(user=user, db=db)


# get all users
@router.get("/") #response_model=List[ShowUser]; debería agregarle count, limit, offset, data
def get_all_users(db: Session = Depends(get_db),f: FilterUser = Depends()):
    return get_users(db=db,f=f)




# get user by id
@router.get("/{id}",response_model=ShowUser)
def get_user_by_id(id:int,db: Session = Depends(get_db)):
    return get_user(id=id,db=db)






# add a group to an user
@router.post("/addgroups/{id}", response_model=ShowUser,  status_code=201)
def add_groups_user(id:int,groups:List[int],db: Session = Depends(get_db)):
    add_group_user(id,groups,db)
    return get_user(id,db)


# desactivar un usuario o activarlo (dsp. sólo admin)
@router.patch("/changestate/{id}")
def change_state_user(id:int,db: Session = Depends(get_db)):
    change_state_user_by_id(id=id, db=db)
    return {"detail": "Success"}