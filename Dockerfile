# Use a small, lightweight image of Nginx to serve your static files
FROM ubuntu:latest

RUN apt-get update
RUN apt-get -y install nginx

# Copy the contents of your project's 'src' directory to Nginx's default public HTML directory
COPY src /var/www/html

# Expose the default port for Nginx (usually port 80)
EXPOSE 80


# Command to start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
