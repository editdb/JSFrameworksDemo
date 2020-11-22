#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

#FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
#WORKDIR /app

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["TennisAngular10.csproj", "TennisAngular10/"]
RUN dotnet restore "TennisAngular10/TennisAngular10.csproj"
COPY . TennisAngular10/.
WORKDIR "/src/TennisAngular10"
RUN dotnet build "TennisAngular10.csproj" -c Release -o /app/build

FROM build AS publish
ENV ASPNETCORE_URLS=http://+:80  
EXPOSE 80
RUN dotnet publish "TennisAngular10.csproj" -c Release -o /app/publish
COPY ./docker-scripts/docker-startup.sh .
COPY ./docker-scripts/wait-for-it.sh .
ENTRYPOINT ["./docker-startup.sh"]
#ENTRYPOINT ["tail", "-f", "/dev/null"]
