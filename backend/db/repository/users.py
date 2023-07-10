from sqlalchemy import and_
from core.hashing import Hasher
from db.models.users import User
from schemas.users import UserCreate,FilterUser
from sqlalchemy.orm import Session


def create_new_user(user: UserCreate, db: Session):
    user = User(
        username=user.username,
        first_name=user.first_name,
        last_name=user.last_name,
        email=user.email,
        hashed_password=Hasher.get_password_hash(user.password),
        is_active=True,
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


    return users




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