# 项目的部署

## 生产服务器登陆方法

争取部署到flightlib上面去
```bash
ssh root@106.75.244.92
```

## docker 部署
```bash
这个项目最好做成docker的

# 生成镜像
docker build -t flight_cache_handler .

# 启动一个container
docker run --name=flight_cache_handler --link mysqllocal:mysqllocal -tid -p 7777:7777 flight_cache_handler
docker run --name=flight_cache_handler -tid -p 7777:7777 flight_cache_handler && docker logs -f flight_cache_handler

# build and start container
docker build -t iyjian/flightengine . && docker run --restart=always --name flightEngine -p 3333:3333 -d iyjian/flightengine

# view logs
docker logs -f flightEngine

# remove existing docker container and built image
docker stop flightEngine && docker rm flightEngine && docker rmi iyjian/flightengine


# create and start the container
docker build -t flight_cache_handler . && docker run --name=flight_cache_handler -tid -p 7777:7777 flight_cache_handler
```