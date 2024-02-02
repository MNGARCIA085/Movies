
import json
from fastapi import status

from db.models.movies import Movie



# no puede dejar a alguien std a un admin si
def test_create_movie_std(client, admin_user_token_headers, add_genre):
    # agrego un par de géneros
    genre1 = add_genre('action')
    genre2 = add_genre('comedy')
    # data
    create_data = {
        "title": "SDE super",
        "description": "python",
        "date": "2023-09-29",
        "image_link": "string",
        "genres":[genre1.id,genre2.id]
    }
    
    response = client.post(
        "/movies/", data=json.dumps(create_data), headers=admin_user_token_headers
    )
    
    assert response.status_code == 201
    data = response.json()
    assert data["title"] == "SDE super"
    assert data["genres"][0]['id'] == genre1.id

    # Verificar que la película existe en la base de datos
    created_movie = db.query(Movie).filter(id=data['id'])
    assert created_movie is not None
    #created_movie = get_movie_by_title("SDE super")
    #assert created_movie is not None



# create movie, no auth
def test_create_movie_std(client,add_genre):
    # agrego un par de géneros
    genre1 = add_genre('action')
    # data
    create_data = {
        "title": "SDE super",
        "description": "python",
        "date": "2023-09-29",
        "image_link": "string",
        "genres":[genre1.id]
    }
    
    response = client.post("/movies/", data=json.dumps(create_data))

    assert response.status_code == 401
    assert response.json()['detail'] == 'Not authenticated'


# create movie without admin role (forbidden)
def test_create_movie_std(client,normal_user_token_headers,add_genre):
    # agrego un par de géneros
    genre1 = add_genre('action')
    # data
    create_data = {
        "title": "SDE super",
        "description": "python",
        "date": "2023-09-29",
        "image_link": "string",
        "genres":[genre1.id]
    }
    response = client.post("/movies/", data=json.dumps(create_data),headers=normal_user_token_headers)
    assert response.status_code == 403
    assert response.json()['detail'] == 'Operation not permitted'







# create movie with errors in the data
def test_create_movie_error_data(client, admin_user_token_headers):


    # data
    create_data = {
        "description": "python",
        "date": "2023-09-29",
        "image_link": "string",
    }
    
    response = client.post(
        "/movies/", data=json.dumps(create_data), headers=admin_user_token_headers
    )

    assert response.status_code == 422
    data = response.json()
    
    # que title se encuentre entre los errores
    title_in_detail = any(item['loc'][1] == 'title' for item in data['detail'])
    assert title_in_detail
    
    # el mensaje de genres
    error_message = None
    for item in data['detail']:
        if item['loc'] == ['body', 'genres']:
            error_message = item['msg']
            break
    assert error_message == 'field required'
    

