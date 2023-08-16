from db.repository.users import change_password_by_id,update_user_by_id,get_user,create_new_user,get_users, add_group_user,get_user,change_state_user_by_id
from db.session import get_db
from fastapi import APIRouter,Depends, HTTPException, status
from schemas.users import ShowUser,FilterUser,UserCreate,UserUpdate,ChangePassword
from sqlalchemy.orm import Session
from typing import List
from core.celery_app import send_async_email




router = APIRouter()


# create new user
@router.post("/", response_model=ShowUser,  status_code=201)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    new_user = create_new_user(user=user, db=db)
    # mail en segundo plano; mail debería ser el de admin
    send_async_email.delay('mngarcia@mail.Antel.com.uy','A new user has been created',
                           f"El nuevo usuario es {new_user.username}")
    return new_user
    #return create_new_user(user=user, db=db)





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




# edit an user
@router.put("/{id}",status_code=201)
def update_user(
                id: int, 
                user: UserUpdate, 
                db: Session = Depends(get_db)):
                #current_user: User = Depends(allow_create_resource)):
    aux = update_user_by_id(id=id, user=user, db=db)
    if not aux:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail=f"User with id {id} not found"
        )
    return {"msg": "Successfully updated data."}




# change password
@router.patch("/changepassword/{id}")
def change_password(id:int,password:ChangePassword, db:Session = Depends(get_db)):
    change_password_by_id(id=id, password=password,db=db)
    return {"detail": "Success"}




# desactivar un usuario o activarlo (dsp. sólo admin)
@router.patch("/changestate/{id}")
def change_state_user(id:int,db: Session = Depends(get_db)):
    change_state_user_by_id(id=id, db=db)
    return {"detail": "Success"}