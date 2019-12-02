FROM ubuntu:18.04

ARG flask_port

ENV TZ=Europe/Bucharest

RUN apt-get update && apt-get install -y \
    gcc \
    git \
    python3 \
    python3-dev \
    python3-setuptools \
    build-essential \
    libmysqlclient-dev \
    python-nose \
    python3-pip \
    iputils-ping \
    net-tools \
    iproute2 \
    telnet \
    netcat \
    sudo \
    vim \
    curl

#               \
#  && rm -rf /var/lib/apt/lists/*

ENV FLASK_APP 'app'

RUN export CC=gcc
#RUN pip3 install Flask
#RUN pip3 install pymongo
#RUN export CC=gcc && pip3 install gunicorn

# set timezone
#RUN echo $TZ > /etc/timezone
#RUN dpkg-reconfigure tzdata

# set up rl-user user
RUN useradd -ms /bin/bash rl-user


# setup all the configfiles
#COPY supervisor-app.conf /etc/supervisor/conf.d/
#
#RUN mkdir -p /home/rl-user/logs
#RUN touch /home/rl-user/logs/general.log
#RUN touch /home/rl-user/logs/gunicorn.log

RUN mkdir -p /home/rl-user/rl-images
COPY --chown=rl-user:rl-user app.py /home/rl-user/app.py
COPY --chown=rl-user:rl-user init.sh /home/rl-user/init.sh
COPY --chown=rl-user:rl-user requirements.txt /home/rl-user/requirements.txt

RUN chmod u+x /home/rl-user/init.sh
RUN chown -R rl-user:rl-user /home/rl-user/
#RUN chown rl-user:rl-user /etc/supervisor/conf.d/supervisor-app.conf

#RUN chmod 777 /var/log/supervisor/

WORKDIR /home/rl-user/

ENTRYPOINT ["/home/rl-user/init.sh"]

EXPOSE ${flask_port}
