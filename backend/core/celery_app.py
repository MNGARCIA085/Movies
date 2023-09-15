from celery import Celery

from core.config import settings

import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


# celery app
celery = Celery(
    "core.celery_app",
    #broker="redis://localhost:6379/0",
    #backend="redis://localhost:6379/0",
    broker='redis://redis:6379/0',
    backend='redis://redis:6379/0',
)

# inicio: celery -A core.celery_app worker --loglevel=info
# flower: create_new_user(user=user, db=d

#
@celery.task
def send_async_email(email, subject,message):
    # Datos de la cuenta de Hotmail
    from_email = settings.EMAIL_SENDER
    from_password = settings.EMAIL_PASSWORD

    # Crear el mensaje de correo electrónico
    msg = MIMEMultipart()
    msg["From"] = from_email
    msg["To"] = email
    msg["Subject"] = subject

    # Agregar el cuerpo del correo
    body = message
    msg.attach(MIMEText(body, "plain"))

    # Establecer la conexión con el servidor SMTP de Hotmail
    server = smtplib.SMTP(settings.EMAIL_SERVER,settings.EMAIL_PORT)
    server.starttls()
    server.login(from_email, from_password)

    # Enviar el correo electrónico
    server.sendmail(from_email, email, msg.as_string())

    # Cerrar la conexión
    server.quit()
    return




#https://jairoandres.com/hablemos-un-poco-de-tareas-en-background/