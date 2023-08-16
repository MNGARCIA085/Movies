from fastapi import HTTPException,status
from sqlalchemy import and_
from core.hashing import Hasher
from db.models.users import User
from db.models.user_groups import UserGroups
from schemas.users import UserCreate,FilterUser,UserUpdate,ChangePassword
from sqlalchemy.orm import Session
from typing import List
from db.models.groups import Groups
import json




# create new user
def create_new_user(user: UserCreate, db: Session):
    # chequeo que el usuario no exista ya
    if db.query(User).filter_by(username=user.username).first():
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, 
                            detail=[
                                {
                                    "loc": [
                                        "body",
                                        "username"
                                    ],
                                    "msg": "user already taken",
                                    "type": "exc_type"
                                    }
                            ])
    # lo ingreso
    user = User(
        username=user.username,
        first_name=user.first_name,
        last_name=user.last_name,
        email=user.email,
        hashed_password=Hasher.get_password_hash(user.password),
        is_active=True,
        is_superuser = user.is_superuser,
        # default group
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


# get user by email
def get_user_by_email(email: str, db: Session):
    user = db.query(User).filter(User.email == email).first()
    return user


# get user by id
def get_user(id:int, db: Session):
    user = db.query(User).filter(User.id == id).first()
    return user



# get all users with filters
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
    if f.first_name:
        filters.append(User.first_name==f.first_name)
    if f.first_name__contains:
        filters.append(User.first_name.contains(f.first_name__contains))
    if f.last_name:
        filters.append(User.last_name==f.last_name)
    if f.last_name__contains:
        filters.append(User.last_name.contains(f.last_name__contains))
    # junto todo
    filters = and_(*filters)
    # consulta
    users = db.query(User).filter(filters).limit(f.limit).offset(f.offset).all()
    # le agrego count, page, limit
    count = db.query(User).filter(filters).count()
    data = [item.__dict__ for item in users]
    data = [{key: value for key, value in item.items() if key != '_sa_instance_state'} for item in data]
    # respuesta
    response = {
        'data': data,
        'count': count,
        'limit':f.limit,
        'offset':f.offset
    }
    return response



# update user by id
def update_user_by_id(id: int, user: UserUpdate, db: Session):
    # cheque que exista el usuario con ese id
    existing_user = db.query(User).filter(User.id == id)
    if not existing_user.first():
        return 0
    # actualizo la peli y sus géneros
    existing_user.update(user.dict(exclude_unset=True)) 
    # commit
    db.commit()
    return 1


# add a group to an user
def add_group_user(id:int,groups:List[int],db:Session):
    # borro los viejos grupos de ese usuario
    db.query(UserGroups).filter(UserGroups.user_id == id).delete()
    # agrego los nuevos
    for g in groups:
        group_user_object = UserGroups(user_id=id,group_id=g)
        db.add(group_user_object)
    db.commit()
    return 


# get all the groups a user belongs to
def get_groups_user(id:int,db:Session):
    groups_users = db.query(UserGroups, Groups).join(Groups).filter(UserGroups.user_id==id)
    return [g.description for _,g in groups_users]




# change password
def change_password_by_id(id: int, password:ChangePassword,db: Session):
    existing_user = db.query(User).filter(User.id == id)
    if not existing_user.first():
        return 0
    # actualizo el password (con su hash())
    existing_user.update({'hashed_password':Hasher.get_password_hash(password.password)})
    db.commit()
    return 1



# deactivate user
def change_state_user_by_id(id: int, db: Session):
    existing_user = db.query(User).filter(User.id == id)
    if not existing_user.first():
        return 0
    # lo desactivo
    if existing_user.first().is_active:
        existing_user.update({'is_active':False})
    else:
        existing_user.update({'is_active':True})
    db.commit()
    return 1





# put, delete



"""
pre-convertir a json para jquery datatable

import json
    # Supongamos que 'result' es el resultado de tu consulta SQLAlchemy
    # Por ejemplo, result = session.query(MyModel).all()
    # Convierte el resultado a una lista de diccionarios
    data = [item.__dict__ for item in users]
    # Elimina el atributo '_sa_instance_state' generado por SQLAlchemy
    data = [{key: value for key, value in item.items() if key != '_sa_instance_state'} for item in data]
    # Convierte la lista de diccionarios a formato JSON
    json_data = json.dumps(data)
    # Imprime el resultado en formato JSON
    print(json_data)

    return data


"""