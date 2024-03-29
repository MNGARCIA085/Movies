import os
from pathlib import Path

from dotenv import load_dotenv

env_path = Path(".") / ".env"
load_dotenv(dotenv_path=env_path)


class Settings:
    PROJECT_NAME: str = "Movies"
    PROJECT_VERSION: str = "1.0.0"

    USE_SQLITE_DB: str = os.getenv("USE_SQLITE_DB")
    DATABASE_URL: str = "sqlite:///./sql_app.db"
    #POSTGRES_USER: str = os.getenv("POSTGRES_USER")
    #POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD")
    #POSTGRES_SERVER: str = os.getenv("POSTGRES_SERVER", "localhost")
    #POSTGRES_PORT: str = os.getenv(
    #    "POSTGRES_PORT", 5432
    #)  # default postgres port is 5432
    #POSTGRES_DB: str = os.getenv("POSTGRES_DB", "tdd")
    #DATABASE_URL = f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_SERVER}:{POSTGRES_PORT}/{POSTGRES_DB}"

    #SECRET_KEY: str = os.getenv("SECRET_KEY")
    SECRET_KEY: str = os.environ.get("SECRET_KEY" , 'somekey')
    ALGORITHM = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES = 30  # in mins

    TEST_USER_EMAIL = "test@example.com"

    # superuser
    FIRST_SUPERUSER: str
    FIRST_SUPERUSER_PASSWORD: str

    # MAIL
    EMAIL_SENDER : str = os.getenv("EMAIL_SENDER")
    EMAIL_PASSWORD: str = os.getenv("EMAIL_PASSWORD")
    EMAIL_SERVER:str = os.getenv("EMAIL_SERVER")
    EMAIL_PORT:str = os.getenv("EMAIL_PORT")



settings = Settings()


"""
Desde main:

@lru_cache()
def get_settings():
    return config.Settings()

from functools import lru_cache    


"""
