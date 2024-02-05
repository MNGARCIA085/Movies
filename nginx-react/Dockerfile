# Utiliza la imagen oficial de Nginx como base
FROM nginx:latest



# Instala openssl para generar los certificados SSL
RUN apt-get update && apt-get install -y openssl


# Copia la configuración personalizada de Nginx para servir la aplicación React
COPY nginx.conf /etc/nginx/nginx.conf

# Expone el puerto 80
EXPOSE 80

# Ejecuta Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]
