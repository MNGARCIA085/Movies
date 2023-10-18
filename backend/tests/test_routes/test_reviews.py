
import json
from datetime import datetime


# sólo puede crear una review un usuario autenticado (y una única vez por peli)
def test_create_review_std(client, normal_user_token_headers, add_genre, add_movie):
    # agrego un par de géneros
    genre = add_genre('action')
    # agrego la peli
    movie = add_movie(title='title',description='desc',genres=[genre],
                            date=datetime(2023, 10, 18),image_link='link')

    # data
    create_data = {
        "score": 3,
        "description": "string",
        "date": "2023-10-18T20:13:18.551Z",
        "movie_id": movie.id
    }
    
    response = client.post(
        "/reviews/", data=json.dumps(create_data), headers=normal_user_token_headers
    )
    
    assert response.status_code == 201
    data = response.json()
    assert data["score"] == create_data['score']


# sólo una review por usuario por peli
def test_create_review_duplicate(client, normal_user_token_headers, add_genre, add_movie):
    # agrego un par de géneros
    genre = add_genre('action')
    # agrego la peli
    movie = add_movie(title='title',description='desc',genres=[genre],
                            date=datetime(2023, 10, 18),image_link='link')

    # data
    create_data = {
        "score": 3,
        "description": "string",
        "date": "2023-10-18T20:13:18.551Z",
        "movie_id": movie.id
    }
    
    response = client.post(
        "/reviews/", data=json.dumps(create_data), headers=normal_user_token_headers
    )
    
    assert response.status_code == 201
    data = response.json()
    assert data["score"] == create_data['score']

    # intento otra vez para la misma peli
    response2 = client.post(
        "/reviews/", data=json.dumps(create_data), headers=normal_user_token_headers
    )

    assert response2.status_code == 422
    assert response2.json()['detail'] == "Only one review can be done"



#pytest tests/test_routes/test_reviews.py --capture=no