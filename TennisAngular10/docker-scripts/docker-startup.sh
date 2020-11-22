#!/bin/sh
dotnet tool install --global dotnet-ef --version 3.1.9 
/root/.dotnet/tools/dotnet-ef database update
./wait-for-it.sh tennisplayers-db:5432 -t 0
cd /app/publish
dotnet TennisAngular10.dll
