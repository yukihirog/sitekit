FROM mysql:5.7

COPY ./conf/my.cnf /etc/mysql/conf.d/my.cnf
COPY ./entry /docker-entrypoint-initdb.d
