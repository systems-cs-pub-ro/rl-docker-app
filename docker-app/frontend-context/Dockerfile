FROM ubuntu:18.04

RUN apt-get update && apt-get install -y \
    nginx

COPY util/nginx/default /etc/nginx/sites-available/
COPY util/nginx/nginx.conf /etc/nginx/nginx.conf

COPY build/ /var/rl/frontend/
COPY init-frontend.sh /init-frontend.sh

RUN chmod u+x /init-frontend.sh
