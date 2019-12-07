# Makefile for the application frontend

include ../vars.mk

DOCKER_IMAGE = $(DOCKER_PREFIX)frontend

all: dependencies build_image

dependencies:
	yarn install

build_image:
	yarn build
	docker build -t "$(DOCKER_IMAGE)" .

push_image:
	docker push "$(DOCKER_IMAGE)"

devserver:
	yarn start

.PHONY: all dependencies build_image push_image devserver

