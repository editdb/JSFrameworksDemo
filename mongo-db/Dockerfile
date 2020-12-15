FROM mongo:3.6.21

COPY ./mongo-init /docker-entrypoint-initdb.d

CMD ["mongod", "--smallfiles"]
