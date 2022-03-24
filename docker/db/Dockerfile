FROM mysql:5.7

COPY ./config/my.cnf /etc/mysql/conf.d/my.cnf
COPY ./entry /docker-entrypoint-initdb.d

RUN apt-get update && apt-get install -y locales-all
