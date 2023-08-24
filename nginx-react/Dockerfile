# Utiliza la imagen oficial de Nginx como base
FROM nginx:latest

# Copia la configuración personalizada de Nginx para servir la aplicación React
COPY nginx.conf /etc/nginx/nginx.conf

# Expone el puerto 80
EXPOSE 80

# Ejecuta Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]
