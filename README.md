# JSFrameworkEdu 
## Vue.js and Angular Javascript frameworks
Demonstration projects for Vue.js and Angular 10 with a Postgres database accessed via a Microsoft C# WebApi.

## Run the four components in Docker
```
docker-compose up -d
```

### Access Vue.js application using Docker
```
url: http://localhost:8080
```

### Access Angular application using Docker
```
url: http://localhost:4200
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
