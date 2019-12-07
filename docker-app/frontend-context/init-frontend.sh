#!/bin/bash

if [[ -z "$FRONTEND_NODE" ]]; then
	FRONTEND_NODE=$(hostname)
fi

export FRONTEND_NODE
export BACKEND_SERVER

envsubst '${FRONTEND_NODE} ${BACKEND_SERVER}' < /etc/nginx/sites-available/default > /etc/nginx/sites-available/default.tmp
mv -f /etc/nginx/sites-available/default.tmp /etc/nginx/sites-available/default

mkdir -p /etc/nginx/sites-enabled/
ln -sf /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default

echo "Starting nginx..."
exec "$@"
