#https://stackoverflow.com/questions/74763804/post-takes-2-positional-arguments-but-3-were-given


import json


# crear un nuevo usuario (caso ok)
def test_create_user(client):
    data = {
        "username": "testuser",
        "email": "testuser@nofoobar.com",
        "password": "testing",
    }
    response = client.post("/users/", data=json.dumps(data))
    assert response.status_code == 200
    assert response.json()["email"] == "testuser@nofoobar.com"
    assert response.json()["is_active"] == True




# obtener todos los usuarios
def test_get_users(client,add_user):
    
    # given
    user_one = add_user('nico','desc1@gmail.com','12345')
    user_two = add_user('mar','desc2@gmail.com','1234')

    # when
    response = client.get("/users/")
    data = response.json()
    
    # then
    assert response.status_code == 200
    assert data[0]['username'] == user_one.username
    assert len(data) == 2




# edit, delete, get_by_id




#pytest --capture=no  (para ver los prints en consola)