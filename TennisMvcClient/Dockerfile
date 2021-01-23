#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["TennisMvcClient.csproj", "TennisMvcClient/"]
COPY ["TennisSwGenClient/TennisSwGenClient.csproj", "TennisMvcClient/TennisSwGenClient/"]
RUN dotnet restore "TennisMvcClient/TennisSwGenClient/TennisSwGenClient.csproj"
RUN dotnet restore "TennisMvcClient/TennisMvcClient.csproj"
COPY . TennisMvcClient/.
WORKDIR "/src/TennisMvcClient"
RUN dotnet build "TennisMvcClient.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "TennisMvcClient.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TennisMvcClient.dll"]