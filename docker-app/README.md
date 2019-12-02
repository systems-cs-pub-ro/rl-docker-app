# 1. Start pe database Docker container and check the logging files
```
docker-compose up -d rl_database
docker logs -f rl_database
```

# 2. Run the migrations only after the database Docker container is up and running

```
cd backend-context
flask db init
flask db migrate
flask db upgrade
```

# 3. Start Flask
```
# In `backend-context` directory
python3 app.py
```
