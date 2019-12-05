#!/bin/bash

pip3 install mysqlclient
pip3 install flask
pip3 install flask_migrate
pip3 install flask-sqlalchemy
pip3 install mysql-connector-python
pip3 install sqlalchemy

# Not necessary
#flask db init
#flask db migrate
#flask db upgrade

python3 app.py
