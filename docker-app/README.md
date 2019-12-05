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
```
