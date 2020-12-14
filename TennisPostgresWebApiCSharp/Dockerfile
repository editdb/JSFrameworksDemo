#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

#FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
#WORKDIR /app

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["TennisPostgresWebApiCSharp.csproj", "TennisPostgresWebApiCSharp/"]
RUN dotnet restore "TennisPostgresWebApiCSharp/TennisPostgresWebApiCSharp.csproj"
COPY . TennisPostgresWebApiCSharp/.
WORKDIR "/src/TennisPostgresWebApiCSharp"
RUN dotnet build "TennisPostgresWebApiCSharp.csproj" -c Release -o /app/build

FROM build AS publish
ENV ASPNETCORE_URLS=http://+:80  
EXPOSE 80
RUN dotnet publish "TennisPostgresWebApiCSharp.csproj" -c Release -o /app/publish
COPY ./docker-scripts/docker-startup.sh .
COPY ./docker-scripts/wait-for-it.sh .
ENTRYPOINT ["./docker-startup.sh"]
#ENTRYPOINT ["tail", "-f", "/dev/null"]
