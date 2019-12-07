#!/bin/bash

# wait for database to become ready
echo "Waiting for mysql to start..."
while ! mysqladmin ping -h"$DB_SERVER" -u"$DB_USER" -p"$DB_PASSWORD" --silent; do
    sleep 1
done

flask db migrate
flask db upgrade

python3 init_db.py

python3 run.py

