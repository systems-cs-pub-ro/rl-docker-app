# Makefile for building all images

all: backend_image database_image frontend_image

backend_image:
	$(MAKE) -s -C "backend-context/" build_image

database_image:
	$(MAKE) -s -C "database-context/" build_image

frontend_image:
	$(MAKE) -s -C "frontend-context/" build_image

push_all:
	$(MAKE) -s -C "database-context/" push_image
	$(MAKE) -s -C "frontend-context/" push_image
	$(MAKE) -s -C "backend-context/" push_image

