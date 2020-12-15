This method of initialising the database users, collections (tables), and documents (records) relies on mongo-init.js running during the first database initialisation. It does not get re-run if mongod detects that the database is already initialised.

In order to have more control over initialisation, consider following the technique contained here:
https://stackoverflow.com/questions/33558506/how-to-create-a-mongo-docker-image-with-default-collections-and-data

