FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src

ENV ASPNETCORE_ENVIRONMENT=Production

COPY ["CineMagic.sln", "./"]
COPY ["CineMagic.API/CineMagic.API.csproj", "CineMagic.API/"]
COPY ["CineMagic.Shared/CineMagic.Shared.csproj", "CineMagic.Shared/"]

RUN dotnet restore "CineMagic.API/CineMagic.API.csproj"

COPY . .
WORKDIR "/src/CineMagic.API"
RUN dotnet publish "CineMagic.API.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS runtime
WORKDIR /app

COPY --from=build /app/publish .

EXPOSE 80

ENTRYPOINT ["dotnet", "CineMagic.API.dll"]
