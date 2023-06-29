from api.base import api_router
from core.config import settings
from db.base import Base
from db.session import engine
from db.utils import check_db_connected
from db.utils import check_db_disconnected
from fastapi import FastAPI



def include_router(app):
    app.include_router(api_router)



def create_tables():
    Base.metadata.create_all(bind=engine)


def start_application():
    app = FastAPI(title=settings.PROJECT_NAME, version=settings.PROJECT_VERSION)
    include_router(app)
    #create_tables()
    return app


app = start_application()




"""
@app.on_event("startup")
async def app_startup():
    await check_db_connected()


@app.on_event("shutdown")
async def app_shutdown():
    await check_db_disconnected()
"""



"""
ALEMBIC
https://stackoverflow.com/questions/17768940/target-database-is-not-up-to-date
https://stackoverflow.com/questions/48242324/undo-last-alembic-migration
"""




"""
models.Base.metadata.create_all(bind=engine); migrar sin usar alembic (en main)
alembic.ini
sqlalchemy.url = "sqlite:///./sql_app.db"

.env de alembic:

config.set_main_option("sqlalchemy.url", "sqlite:///./sql_app.db")
from db.base import Base  # noqa
target_metadata = Base.metadata


migraciones

alembic revision --autogenerate -m "Initial migration"
alembic upgrade head


----> https://medium.com/@julgq/migraciones-en-fastapi-usando-alembic-19379607db70

"""