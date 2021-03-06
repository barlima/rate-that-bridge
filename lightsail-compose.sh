#!/bin/bash

# install latest version of docker the lazy way
curl -sSL https://get.docker.com | sh

# make it so you don't need to sudo to run docker commands
usermod -aG docker ubuntu

# install docker-compose
curl -L https://github.com/docker/compose/releases/download/1.21.2/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# copy the dockerfile into /srv/docker 
# if you change this, change the systemd service file to match
# WorkingDirectory=[whatever you have below]
mkdir /srv/rtb
curl -o /srv/rtb/docker-compose.yml https://raw.githubusercontent.com/barlima/rate-that-bridge/master/docker-compose.yml

# copy in systemd unit file and register it so our compose file runs 
# on system restart
curl -o /etc/systemd/system/docker-compose-app.service https://raw.githubusercontent.com/barlima/rate-that-bridge/master/docker-compose-app.service
systemctl enable docker-compose-app

# copy .env.example
curl -o /srv/rtb/.env https://github.com/barlima/rate-that-bridge/blob/master/.env.example

# copy nginx config
mkdir /srv/rtb/config
curl -o /srv/rtb/config/nginx.conf https://raw.githubusercontent.com/barlima/rate-that-bridge/master/config/nginx.conf

# create db file
mkdir /srv/rtb/api
touch /srv/rtb/api/database.sqlite

# start up the application via docker-compose
docker-compose -f /srv/rtb/docker-compose.yml up -d