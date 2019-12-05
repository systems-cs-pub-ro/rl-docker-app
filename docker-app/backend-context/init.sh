#!/bin/bash

pip3 install mysqlclient
pip3 install flask
pip3 install flask_migrate
pip3 install flask-sqlalchemy
pip3 install mysql-connector-python
pip3 install sqlalchemy

flask db init
flask db migrate
flask db upgrade

python3 init_db.py

python3 run.py
