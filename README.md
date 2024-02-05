Start by cloning the repo:


git clone https://github.com/MNGARCIA085/Movies.git


## 1. SIN DOCKER


### 1.1. BACKEND

Create .env in the root:

USE_SQLITE_DB=True
FIRST_SUPERUSER=****
FIRST_SUPERUSER_PASSWORD=***
SECRET_KEY=******
EMAIL_SENDER=*****
EMAIL_PASSWORD=********
EMAIL_SERVER=*****
EMAIL_PORT=******


Create virtual environment and install dependencies:


..$ cd backend

...$ python -m venv env
...$ source env/bin/activate


...backend$ pip install -r requirements.txt




Create and execute initial migrations (SQLite will be used for simplicity, but you can use any other 
by defining the database, user, and password in .env and configuring db/session.py appropriately):


alembic revision --autogenerate -m "Initial migration"
alembic upgrade head


Initial data load (optional) (Among other things, this will create an "admin" user with password "1234"
and (among others) standard user "u1" with password "1234"):

....backend$ ./pre-start.sh 



Start the backend (we will use port 1340):

(The --reload flag is useful for development)

You can view the app documentation at:

htpp://127.0.0.1:1340/docs



You can run the tests as follows:

....backend$ pytest




### 1.2. FRONTEND

In another tab:

...$ cd frontend/movies

....movies $ npm install


Start the frontend

....$ npm start


You can access it at localhost:3000

You can find a description of app usage at ......(link to usage)


## 2. CON DOCKER



As we will serve it over https, SSL certificates must be generated.

You can generate self-signed certificates on Linux using the following commands:


openssl genrsa 2048 > my-site.key
chmod 400 my-site.key
openssl req -new -x509 -nodes -sha256 -days 365 -key my-site.key -out my-site.cert

The nginx folder should look like this:

nginx
 └── Dockerfile.nginx
 └── my-site.cert
 └── my-site.key
 └── nginx.conf



Build the image:

...$ sudo docker-compose -f docker-compose.yaml up -d --build


Start the container:


.....$ sudo docker-compose up -d

View the logs:

....$sudo docker-compose logs -f


You can access the backend at localhost:1340 and the frontend at localhost:3000."


You can also access the backend via https://localhost/docs


