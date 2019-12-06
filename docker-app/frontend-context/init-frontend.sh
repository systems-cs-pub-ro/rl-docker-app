#!/bin/bash

export FRONTEND_NODE
export BACKEND_SERVER

envsubst '${FRONTEND_NODE} ${BACKEND_SERVER}' < /etc/nginx/sites-available/default > /etc/nginx/sites-available/default

mkdir -p /etc/nginx/sites-enabled/

exec "$@"
