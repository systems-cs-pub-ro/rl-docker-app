#!/bin/bash

flask db migrate
flask db upgrade

python3 init_db.py

python3 run.py
