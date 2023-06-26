from api.v1 import route_users
from fastapi import APIRouter


api_router = APIRouter()
#api_router.include_router(route_movies.router, prefix="/movies", tags=["movies"])
api_router.include_router(route_users.router, prefix="/users", tags=["users"])
#api_router.include_router(route_login.router, prefix="/login", tags=["login"])