# 🐳 Docker RL Lab

This repo contains the source files for the docker images required in the Docker RL laboratory.

## 🧱 Prerequisites

In order to be able to run and build this repository, you will need the following packages:

* `Python 3`
* `NodeJS > 12`
* `Docker`

## 👨‍💻 Development steps

This section will go over the rough steps needed to run the local development environment for each project. For more details, check the `README` files in the respective project's folder.

### 🎨 Frontend app

The frontend application is a [`Create React App`](http://create-react-app.dev) application, so most of the documentation there also applies here.

In order to spin up the development server, run the following commands:

```bash
cd docker-app/frontend-context
yarn # or npm install - To install required packages
yarn start # or npm start - To spin up the development server

# Run frontend in container
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

The frontend development server will run on `localhost:3000`. It will also expect the backend server to be up and running on `localhost:5000`.

### 📦 Database

The database is a MySQL Docker container that you have to turn on before running the API. To spin it up, run the following commands:

```bash
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
```

You can also follow logs to know when the database has finished spinning up:

```bash
docker logs -f rl-database
```

### 🚚 Backend API

The backend API is a [`Flask`](https://www.palletsprojects.com/p/flask/) project written in Python 3. In order to turn it on, you have to do the following:

```bash
cd docker-app/backend-context
flask db init # This will configure a fresh database
flask db migrate #
flask db upgrade # This will sync up the database with the ORM models

python3 init_db.py # Insert initial data about the predefined images

python3 run.py # Start the application
```

In the case that you are running a previous version of the database and need to bring it up to the most recent version, you can run the following command to execute the migrations:

```bash
flask db migrate
```

## 🚛 Deployment steps

Deployment is done via [Docker Hub](https://hub.docker.com/) and is automatically done on every push to the `master` branch via [GitHub Actions](https://github.com/features/actions).

If you want to build the images locally, you have to follow certain steps for each component of the application:

### 🎨 Frontend

The frontend application needs to first be built, and the resulting files need to be delivered via a static web server such as [`Nginx`](https://nginx.com).

In order to build the frontend application, run the following commands:

```bash
cd docker-app/frontend-context
yarn # or npm install - to install files
yarn build # or npm run build
```

This will generate a `build/` folder which contains all the assets that need to be delivered to the end user. A sample `nginx` configuration is also provided in `docker-app/frontend-context/util/nginx/site`.

### 📦 Database

There is one schema in the database named `images` that is created at deployment using SQLAlchemy ORM.
Database connection details such as server name, username, password are retrieved from environment variables defined at start-up.

```bash
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

```

### 🚚 Backend API

The entire logic (incuding the database Models) resides in `run.py` script.

In `backend-context` the entrypoint script `init.sh`:

* install the `Python` packages,
* apply the migrations, 
* run the `init_db.py` that adds default entries in the database
* and in the end it starts the application.

```bash
cd backend-context/
docker build -t rl-backend-image .
docker run -d --name=rl-backend --hostname=rl-backend \
    -e DB_SERVER=192.168.200.4 \
    -p 5000:5000 --network=rl-network \
    --ip=192.168.200.3 \
    rl-backend-image
```
