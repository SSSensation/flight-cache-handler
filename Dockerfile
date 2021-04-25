FROM node:12.16.2

WORKDIR /usr/src/app

RUN mkdir flightCacheHandler

ENV TZ Asia/Shanghai
ENV NODE_ENV production

WORKDIR /usr/src/app/flightCacheHandler
COPY . .
# RUN npm config set registry https://registry.npm.taobao.org
# RUN npm info express
# RUN npm install cnpm -g --registry=https://registry.npm.taobao.org

RUN cnpm install
EXPOSE 7777
CMD [ "npm", "start" ]
