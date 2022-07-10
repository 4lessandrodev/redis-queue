redis:
	docker build . --label redis --tag redis-default
	docker run --name redis-default --detach=true --publish=6379:6379 -d redis

stop:
	docker stop redis-default

clear:
	docker system prune --all --force

start:
	docker run --name redis-default --detach=true --publish=6379:6379 -d redis
