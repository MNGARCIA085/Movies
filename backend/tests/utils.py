from db.repository.users import create_new_user
from db.repository.users import get_user_by_email,add_group_user
from fastapi.testclient import TestClient
from schemas.users import UserCreate
from sqlalchemy.orm import Session



from schemas.groups import GroupCreate
from db.repository.groups import create_new_group




def user_authentication_headers(client: TestClient, email: str, password: str):
    data = {"username": email, "password": password}
    r = client.post("/login/token", data=data)
    response = r.json()
    auth_token = response["access_token"]
    headers = {"Authorization": f"Bearer {auth_token}"}
    return headers


def authentication_token_from_email(client: TestClient, email: str, db: Session):
    print('sdfdsfsdsdd')
    """
    Return a valid token for the user with given email.
    If the user doesn't exist it is created first.
    """
    password = "admin@mail.com"
    user = get_user_by_email(email=email, db=db)
    if not user:
        user_in_create = UserCreate(username=email, 
                                    first_name='fsdfds',
                                    last_name='dsfds',
                                    email=email, 
                                    password=password,
                                    password2=password)
        user = create_new_user(user=user_in_create, db=db)


        # ROL ADMIN!!!
        group = GroupCreate(description='admin')
        g = create_new_group(group,db)


        # lo agrego a su grupo
        add_group_user(user.id,[g.id],db)


    return user_authentication_headers(client=client, email=email, password=password)