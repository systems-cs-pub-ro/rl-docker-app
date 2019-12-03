# 🐳 Docker RL Lab

This repo contains the source files for the docker images required in the Docker RL laboratory.

## 🧱 Prerequisites

In order to be able to run and build this repository, you will need the following packages:

* `Python 3`
* `NodeJS > 12`
* `Docker`
* `docker-compose`

## 👨‍💻 Development steps

This section will go over the rough steps needed to run the local development environment for each project. For more details, check the `README` files in the respective project's folder.

### 🎨 Frontend app

The frontend application is a [`Create React App`](http://create-react-app.dev) application, so most of the documentation there also applies here.

In order to spin up the development server, run the following commands:

```bash
cd docker-app/frontend-context
yarn # or npm install - To install required packages
yarn start # or npm start - To spin up the development server
```

The frontend development server will run on `localhost:3000`. It will also expect the backend server to be up and running on `localhost:5000`.

### 📦 Database

The database is a MySQL Docker container that you have to turn on before running the API. To spin it up, run the following commands:

```bash
cd docker-app/
docker-compose up -d rl-database
```

You can also follow logs to know when the database has finished spinning up:

```bash
docker-compose logs -f rl-database
```

### 🚚 Backend API

The backend API is a [`Flask`](https://www.palletsprojects.com/p/flask/) project written in Python 3. In order to turn it on, you have to do the following:

```bash
cd docker-app/backend-context
pip3 install -r requirements.txt # To install the necessary dependencies
flask db init # This will configure a fresh database
flask db upgrade # This will sync up the database with the ORM models
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
yarn build # or npm run build
```

This will generate a `build/` folder which contains all the assets that need to be delivered to the end user. A sample `nginx` configuration is also provided in `docker-app/frontend-context/util/nginx/site`.

### 📦 Database

TODO

### 🚚 Backend API

TODO

