# Makefile for the application database

include ../vars.mk

DOCKER_IMAGE = $(DOCKER_PREFIX)database

all: build_image

build_image:
	docker build -t "$(DOCKER_IMAGE)" .

push_image:
	docker push "$(DOCKER_IMAGE)"

.PHONY: all build_image push_image

