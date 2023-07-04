from api.v1 import route_users,route_movies,route_reviews,route_genres
from fastapi import APIRouter


api_router = APIRouter()
api_router.include_router(route_movies.router, prefix="/movies", tags=["movies"])
api_router.include_router(route_users.router, prefix="/users", tags=["users"])
api_router.include_router(route_reviews.router, prefix="/reviews", tags=["reviews"])
api_router.include_router(route_genres.router, prefix="/genres", tags=["genres"])