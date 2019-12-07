#!/bin/bash

# wait for database to become ready
echo "Waiting for mysql to start..."
while ! mysqladmin ping -h"$DB_SERVER" -u"$DB_USER" -p"$DB_PASSWORD" --silent 2>/dev/null; do
    sleep 1
done

flask db migrate
flask db upgrade

echo "Initializing database..."
python3 init_db.py

echo "Done. Running the backend server..."
python3 run.py

