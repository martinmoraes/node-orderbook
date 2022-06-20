#!/bin/bash

docker run -d --rm -p 27017:27017 --name mongodb-book \
	-e MONGO_INITDB_ROOT_USERNAME=book \
	-e MONGO_INITDB_ROOT_PASSWORD=book \
mongo
