# Javascript Frameworks, REST and GraphQL Endpoints, Postgres and MongoDB Database Demo

### This repo provides Postres and MongoDB databases along with C# WebApi endpoints to access them. In addition there is a GraphQL endpoint which provides access to the Postgres data.

---
### Angular 10, Vue.js, ReactJS and Blazor front-end projects are included to provide end-user access to the Postres \[[here](#Running-Angular-Vue-and-Blazor-via-WebApi-to-Postgres)\]
### and MongoDB data via the endpoints \[[here](#Running-Angular-Vue-and-Blazor-via-WebApi-to-MongoDB)\].
---
### Another Angular 10 project accesses the Postgres database via a C# GraphQL endpoint \[[here](#Running-Angular-via-GraphQL-to-Postgres)\].
---
### All configurations are available to be built and run through Docker using the supplied commands. See Docker [notes](#Docker-Notes)
---
### Endpoints can be demonstrated by following instructions \[[here](#Demonstrating-Endpoints)\].
---
### Integration tests for the Postgres WebApi project are contained in the `TennisPostgresWebApiIntegTest` project. The tests run over a SQLite database using EF to automatically create the tables. The tests operate against the end-points made available by running up the C# WebApi `TennisPostgresWebApiCSharp` project. 
---

The database contains three tables (or collections in Mongo parlance). These tables describe tennis players, their rankings over the last few years, and the player's country.
The UI lists the players and allows their attributes to be changed and a player image to be uploaded. It also list the players' rankings given a selected gender and year, and allows the ranking to be edited. If a player's points are amended such that their rank should be changed, then the player's rank is re-calculated and their position in the list changes.

---
### Running Angular Vue and Blazor via WebApi to Postgres
The Postgres database, C# WebApi, and Angular, Vue and React applications can be started using the following Docker command. Data tables containing initial records are created or ensured during the startup process.
```
docker-compose -f .\docker-compose-all-postgres.yml up -d
```

Access the Angular application using the following url http://localhost:4200


Access the Vue.js application using this url 
http://localhost:8080


Access the React.js application using this url 
http://localhost:3000


Access the Blazor/MVC Razor application using this url 
http://localhost:5000


|Folder |Purpose|
| -------- | -------- |
|**Angular** |The Angular 10 project|
|**vuejs** |The Vue.js project. Client-side validation with Vuelidate. Charting with Chart.js.|
|**reactjs** |The Reactjs project|
|**TennisMvcClient** |The Blazor/MVC Razor project|
|**TennisPostgresWebApiCSharp** |The C# WebApi project which accesses a Postgres database|


### Running Angular Vue and Blazor via WebApi to MongoDB

MongoDB can be used instead of Postgres, coupled with a C# WebApi serving up the MongoDB database with an Angular front-end. This configuration can be started in Docker by 
```
docker-compose -f .\docker-compose-all-mongo.yml up -d
```

Access the Angular application using the following url http://localhost:4200


Access the Vue.js application using this url 
http://localhost:8080


Access the React.js application using this url 
http://localhost:3000


Access the Blazor/MVC Razor application using this url 
http://localhost:5000



|Folder |Purpose|
| -------- | -------- |
|**Angular** |The Angular 10 project|
|**vuejs** |The Vue.js project|
|**reactjs** |The Reactjs project|
|**TennisMvcClient** |The Blazor/MVC Razor project|
|**TennisMongoDBWebApiCSharp** |The C# WebApi project which accesses a MongoDB database|


---
### Running Angular via GraphQL to Postgres

The configuration whereby an Angular front-end goes through a C# GraphQL server to the Postgres database can be started using
```
docker-compose -f .\docker-compose-all-graphql.yml up -d
```

The GraphiQL application, allowing GraphQL commands to be entered and the schema documentation to be viewed, is available at http://localhost:52264/graphiql/

|Folder |Purpose|
| -------- | -------- |
|**AngularToGraphQL**| The Angular 10 project|
|**TennisPostgresGraphQLCSharp**| The C# GraphQL server project which accesses a Postgres database|



---

### Docker Notes

To start up Docker instances, run the command
```
docker-compose -f ./<filename> up -d
```
Note that the first time a configuration is run, the Docker components will need to be built. This will take several minutes.

To shutdown Docker instances, run the command
```
docker-compose -f ./<filename> down
```
|Filename|Purpose|
|---|---|
|docker-compose-all-postgres.yml|Postgres database, C# REST server, Angular, Vue.js, React.js and Blazor/MVC Razor front-ends|
|docker-compose-all-mongo.yml|MongoDB database, C# mongo-specific REST server, Angular, Vue.js, React.js and Blazor/MVC Razor front-ends|
|docker-compose-all-graphql.yml|Postgres database, C# GraphQL server, Angular front-end|
|docker-compose-only-postgres.yml|Postgres database only |
|docker-compose-only-mongo-db.yml|MongoDB database only |
|docker-compose-api-postgres.yml|Postgres database, C# REST WebApi server|
|docker-compose-api-mongo.yml|MongoDB database, C# REST WebApi server|
|docker-compose-api-graphql.yml|Postgres database, C# GraphQL server|



### If Docker runs on `192.168.99.100` 

Docker Toolbox on Windows might run on `192.168.99.100` rather than `localhost`. The MINGW64 comand window will say if this is the case.

In such a case, replace `localhost` with `192.168.99.100` for any browser urls. 

In addition, prior to running any *docker-compose* commands, replace localhost with `192.168.99.100` in the *.env* file.



If running Vue natively by `npm run serve` then in the vuejs/.env file, change `localhost` to `192.168.99.100`

If running Angular natively by `ng serve --o` then in the Angular/src/environments/environment.ts file, change `localhost` to `192.168.99.100` in the property named webapiUrl

If running React natively by `npm start` then in the reactjs/src/environments/environment.ts file, change `localhost` to `192.168.99.100` in the property named webapiUrl


### Demonstrating Endpoints
Select the appropriate "api" yml to start  from the "Filename" table above according to what api you want to demonstrate.

The Postgres C# REST WebApi can be demonstrated, returning the Player Rankings for 2018 Men, by loading the following url in a browser.

http://localhost:53316/api/rankingsList/2018/M

The MongoDB C# REST WebApi can be demonstrated, returning the Player Rankings for 2018 Men, by loading the following url in a browser.

http://localhost:53316/api/rankingsList/2018/M

The Postgres C# GraphQL WebApi can be demonstrated but not by loading a url into a browser because statements have to be POSTed to the endpoint. The GraphQL server itself provides a UI that can do this.

http://localhost:52264/graphiql/

Queries can be entered into the left-hand panel, and the documentation can be seen in the right-hand section. The middle section will show query results (or errors).

A query to return the same rankings list as above might be 

```
{
    rankings(year:2018, gender:"M") {
        id,
        rank,
        year,
        player {
            id,
            name,
            country {
            name,
            imageLink
            }
        },
        points,
        prizeMoney
    }
}
```
although you specify the fields you require, as long as they follow the schema.

An api-tool can be used instead of graphiql, such as [Postman](https://www.postman.com/).

To use this, set up a POST request to the url http://localhost:52264/graphql
Next, add an http header called `Content-Type` with the value `application/json`

The post `Body` needs to be specified with strings and decorated. The above query will instead take the form
```
{
    "query": "{rankings(year: 2018, gender: \"M\") {id rank year player { id name country { name imageLink } } points prizeMoney }}"
}
```