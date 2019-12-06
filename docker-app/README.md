##### 1. Start pe database Docker container and check the logging files
```
docker-compose up -d rl_database
docker logs -f rl_database
```
##### 2. Install the requirements
```
cd backend-context
pip3 install -r requirements.txt
```

##### 3. Run the migrations only after the database Docker container is up and running

```
# In `backend-context` directory
flask db init
flask db migrate
flask db upgrade
```

##### 4. Start Flask
```
# In `backend-context` directory
python3 run.py
```

##### 5. Swarm
```
# In order to retrieve the backend node in GUI you should set the environment variable
# named `BACKEND_NODE` inside the container.

docker network create --driver=bridge --subnet=192.168.200.0/24 --gateway=192.168.200.1 rl-network

cd database-context/
docker run -d --name=rl-database --hostname=rl-database \
    -e MYSQL_DATABASE=rl-database \
    -e MYSQL_USER=rl-user \
    -e MYSQL_PASSWORD=rl-specialpassword \
    -e MYSQL_ROOT_PASSWORD=root \
    -e TZ=Europe/Bucharest \
    -p 3306:3306 \
    --network=rl-network \
    --ip=192.168.200.4 \
    mysql

cd backend-context/
docker build -t rl-backend-image .
docker run -d --name=rl-backend --hostname=rl-backend \
    -e DB_SERVER=192.168.200.4 \
    -p 5000:5000 --network=rl-network \
    --ip=192.168.200.3 \
    rl-backend-image

cd frontend-context/
yarn build
docker build -t rl-frontend-image .

docker run -d --name=rl-frontend --hostname=rl-frontend \
    -e FRONTEND_NODE=FIRST_NODE \
    -e BACKEND_SERVER=192.168.200.3 \
    -p 80:80 --network=rl-network \
    --ip=192.168.200.2 \
    rl-frontend-image
```
