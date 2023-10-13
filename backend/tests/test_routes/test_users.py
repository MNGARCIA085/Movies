#https://stackoverflow.com/questions/74763804/post-takes-2-positional-arguments-but-3-were-given


import json





# crear un nuevo usuario (caso ok)
def test_create_user(client):
    data = {
        "username": "testuser",
        "first_name": "n1",
        "last_name": "a1",
        "email": "testuser@nofoobar.com",
        "password": "testing",
        "password2":"testing",
    }
    response = client.post("/users/", data=json.dumps(data))
    assert response.status_code == 201
    assert response.json()["email"] == "testuser@nofoobar.com"
    assert response.json()["is_active"] == True



# crear un nuevo usuario (da error, falta username y los passwords no coinciden)
def test_create_user_error(client):
    
    # given
    data = {
        "first_name": "n1",
        "last_name": "a1",
        "email": "testuser@nofoobar.com",
        "password": "testing",
        "password2":"testing2",
    }
    
    
    # when
    response = client.post("/users/", data=json.dumps(data))
    
    
    # then
    assert response.status_code == 422
    data = response.json()
    
    # que username se encuentre entre los errores
    username_in_detail = any(item['loc'][1] == 'username' for item in data['detail'])
    assert username_in_detail
    
    # el mensaje del password
    error_message = None
    for item in data['detail']:
        if item['loc'] == ['body', 'password2']:
            error_message = item['msg']
            break
    assert error_message == 'Passwords do not match'



# obtener todos los usuarios
def test_get_users(client,add_user):
    # given
    user_one = add_user('nico','u1','a1','desc1@gmail.com','12345')
    user_two = add_user('mar','u2','a2','desc2@gmail.com','1234')

    # when
    response = client.get("/users/")
    
    # then
    data = response.json()
    assert response.status_code == 200
    assert data['data'][0]['username'] == user_one.username # garantizar el roden en la consulta luego
    assert data['data'][1]['last_name'] == user_two.last_name
    assert len(data['data']) == 2



# get user by id
def test_get_user_by_id(client,add_user):
    # given
    user = add_user('u1','name','last_name','desc1@gmail.com','12345')

    # when
    response = client.get(f"/users/{user.id}")
    
    # then
    assert response.status_code == 200
    data = response.json()
    assert data['id'] == user.id
    assert data['email'] == user.email



# get user by id (not found)
def test_get_user_by_not_found(client):
    # when
    response = client.get(f"/users/99") # some id that does not exist
    # then
    assert response.status_code == 404




# update user
def test_update_user(client,add_user):
    # given
    user = add_user('u1','name','last_name','desc1@gmail.com','12345')


    # new data
    update_data = {
        "username":'u3', # ver dsp. si dejo editarlo
        "first_name":"marcos",
        "last_name":"garcia",
        "email":"somethin@mail.com"
    }

    # when
    response = client.put(f"/users/{user.id}",
                          data=json.dumps(update_data))
    
    # then
    assert response.status_code == 201


    # debería devolver bien los datos
    data = response.json()
    assert data['msg'] == 'Successfully updated data.'
    assert data['data']['first_name'] == update_data['first_name']
    assert data['data']['last_name'] == update_data['last_name']






# no borro usuarios, los desactivo


"""
def test_delete(client,add_user):
    # given
    user = add_user('u1','name','last_name','desc1@gmail.com','12345')
    # when
    response = client.delete(f"/users/{user.id}")
    # then
    pass
"""



# add groups




# change password






#pytest --capture=no  (para ver los prints en consola)

#pytest -k "user" -v