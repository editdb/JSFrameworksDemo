# JSFrameworkEdu 
## Vue.js and Angular Javascript frameworks
Demonstration projects for Vue.js and Angular 10 with a Postgres [or MongoDB] database accessed via a Microsoft C# WebApi.

## Run the four components in Docker
```
docker-compose -f .\docker-compose-all-postgres.yml up -d
```

### Access Vue.js application using Docker
```
url: http://localhost:8080
```

### Access Angular application using Docker
```
url: http://localhost:4200
```

### MongoDB can be used instead of Postgres, coupled with a C# WebApi serving up the MongoDB database. This configuration can be started in Docker by 
```
docker-compose -f .\docker-compose-all-mongo.yml up -d
```

### Note for Docker Toolbox users where Docker uses 192.168.99.100 rather than localhost running all in Docker
```
In the .env file, change localhost to 192.168.99.100
```
### Note for Docker Toolbox users where Docker uses 192.168.99.100 rather than localhost running Vue via npm run serve
```
In the vuejs/.env file, change localhost to 192.168.99.100
```
### Note for Docker Toolbox users where Docker uses 192.168.99.100 rather than localhost running Angular via ng serve --o
```
In the Angular/src/environments/environment.ts file, change localhost to 192.168.99.100 in the property named webapiUrl
```
