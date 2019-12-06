FROM ubuntu:18.04

RUN apt-get update && apt-get install -y \
    gettext-base \
    nginx

COPY util/nginx/nginx.conf /etc/nginx/nginx.conf
COPY util/nginx/default /etc/nginx/sites-available/

COPY build/ /var/rl/frontend/
COPY init-frontend.sh /init-frontend.sh

RUN chmod u+x /init-frontend.sh

CMD ["nginx", "-g", "daemon off;"]

EXPOSE 80

ENTRYPOINT ["/init-frontend.sh"]
