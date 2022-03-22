FROM mysql:5.7

RUN apt-get update && apt-get install -y locales-all

ENV LC_ALL="ja_JP.UTF-8" TZ="Asia/Tokyo"

COPY ./config/my.cnf /etc/mysql/conf.d/my.cnf
COPY ./entry /docker-entrypoint-initdb.d
