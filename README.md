# 项目的部署

## 生产服务器登陆方法

争取部署到flightlib上面去
```bash
ssh root@106.75.244.92
```

## docker 部署
```bash
这个项目最好做成docker的


# build and start container
docker build -t iyjian/flightengine . && docker run --restart=always --name flightEngine -p 3333:3333 -d iyjian/flightengine

# view logs
docker logs -f flightEngine

# remove existing docker container and built image
docker stop flightEngine && docker rm flightEngine && docker rmi iyjian/flightengine
```