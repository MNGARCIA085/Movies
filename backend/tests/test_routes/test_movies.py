
import json

from fastapi import status



"""
def test_create_movie(client):
    print('uno')

    data = {
        "title": "SDE super",
        "description": "python",
        "genres": [1],
    }
    response = client.post(
        "/movies/", data=json.dumps(data),
    )
    assert response.status_code == 201
    #assert response.json()["company"] == "doogle"
    #assert response.json()["description"] == "python"
"""




# no puedde dejar a alguien std a un admin si
def test_create_movie_std(client, normal_user_token_headers):
    print('vamos dos')
    print(normal_user_token_headers)
    data = {
        "title": "SDE super",
        "description": "python",
        "genres": [1],
        "date": "2023-09-29",
        "image_link": "string",
    }
    response = client.post(
        "/movies/", data=json.dumps(data), headers=normal_user_token_headers
    )
    assert response.status_code == 201
    assert response.json()["title"] == "SDE super"
    #assert response.json()["description"] == "python
