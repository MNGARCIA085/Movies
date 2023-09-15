# Dockerfile.fastapi
FROM python:3.8-slim

WORKDIR /app

COPY ./requirements.txt .
#RUN pip install --no-cache-dir -r requirements.txt
RUN pip install -r requirements.txt

COPY . /app

#ENV FASTAPI_ENV=production

EXPOSE 8000

#CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"] # dsp. workers
CMD ["gunicorn", "-k", "uvicorn.workers.UvicornWorker", "--host", "0.0.0.0", "--port", "8000"] 


#gunicorn main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:80