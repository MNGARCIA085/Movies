Comience por clonar el repo


git clone https://github.com/MNGARCIA085/Movies.git


## 1. SIN DOCKER


### 1.1. BACKEND

Crear .env en el root

USE_SQLITE_DB=True
FIRST_SUPERUSER=****
FIRST_SUPERUSER_PASSWORD=***
SECRET_KEY=******
EMAIL_SENDER=*****
EMAIL_PASSWORD=********
EMAIL_SERVER=*****
EMAIL_PORT=******


Create virtual env and install dependencies


..$ cd backend

...$ python -m venv env
...$ source env/bin/activate


...backend$ pip install -r requirements.txt


Crear y ejecutar las migraciones iniciales (se trabajará por sencillez con SQLite,
pero puede usar cualquier otra definiendo la base, usuario y password en el .env
y configurando apropiadamente db/session.py)



alembic revision --autogenerate -m "Initial migration"
alembic upgrade head


Carga inicial de datos (opcional) (Entre otras cosas, esto creará un usuario "admin" con password "1234")

....backend$ ./pre-start.sh 



Iniciar el backend:

.....frontend $ uvicorn main:app --reload

(el --reload es útil para desarrollo)


Puede ver la documentación de la app funcionando en:

htpp://127.0.0.1:8000/docs



Los tests puede ejecutarlos de la siguiente forma:

....backend$ pytest




### 1.2. FRONTEND

En otra pestaña:

...$ cd frontend/movies

....movies $ npm install


Iniciar el frontend

....$ npm start


Puede acceder a él en localhost:3000


Puede encontrar una descripción de uso de la app en ......(link al uso)


## 2. CON DOCKER



Como vamos a servirlo por https deben generarse los certificados SSL, como es un ejemplo
aquí serán self-signed:


Una vez generados, los guardamos en.....


Construimos la imagen:

...$ sudo docker-compose -f docker-compose.yaml up -d --build


Levantamos el contenedor:


.....$ sudo docker-compose up -d


Vemos los logs:

....$sudo docker-compose logs -f



Puede acceder al backend en localhost:1340 y al frontend en localhost:3000.


