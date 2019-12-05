FROM ubuntu:18.04

ARG flask_port

ENV TZ=Europe/Bucharest

RUN apt-get update && apt-get install -y \
    gcc \
    git \
    python3 \
    python3-pip \
    python3-dev \
    python3-setuptools \
    build-essential \
    libmysqlclient-dev \
    libssl-dev \
    iputils-ping \
    net-tools \
    iproute2 \
    telnet \
    netcat \
    sudo \
    vim \
    curl


RUN export CC=gcc

RUN useradd -ms /bin/bash rl-user

RUN mkdir -p /home/rl-user/rl-app/rl-images

COPY --chown=rl-user:rl-user ./rl-images/* /home/rl-user/rl-app/rl-images/
COPY --chown=rl-user:rl-user run.py /home/rl-user/rl-app/run.py
COPY --chown=rl-user:rl-user init.sh /home/rl-user/rl-app/init.sh
COPY --chown=rl-user:rl-user init_db.py /home/rl-user/rl-app/init_db.py
COPY --chown=rl-user:rl-user requirements.txt /home/rl-user/rl-app/requirements.txt
COPY --chown=rl-user:rl-user ./migrations/ /home/rl-user/rl-app/migrations/

RUN chmod u+x /home/rl-user/rl-app/init.sh
RUN chown -R rl-user:rl-user /home/rl-user/rl-app

WORKDIR /home/rl-user/rl-app/

ENTRYPOINT ["/home/rl-user/rl-app/init.sh"]

EXPOSE ${flask_port}
