#!/bin/sh
#dotnet tool install --global dotnet-ef --version 3.1.9 
#/root/.dotnet/tools/dotnet-ef database update
./wait-for-it.sh mongo-db:27017 -t 0
cd /app/publish
dotnet TennisMongoDB.dll
