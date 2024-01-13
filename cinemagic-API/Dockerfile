FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src

# Copy solution and project files
COPY ["CineMagic.sln", "./"]
COPY ["CineMagic.API/CineMagic.API.csproj", "CineMagic.API/"]
COPY ["CineMagic.Shared/CineMagic.Shared.csproj", "CineMagic.Shared/"]

# Restore NuGet packages
RUN dotnet restore "CineMagic.API/CineMagic.API.csproj"

# Copy everything else and build
COPY . .
WORKDIR "/src/CineMagic.API"
RUN dotnet publish "CineMagic.API.csproj" -c Release -o /app/publish

# Final stage/image
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS runtime
WORKDIR /app

# Copy the published app from the build stage
COPY --from=build /app/publish .

EXPOSE 80

# Define the entry point for the application
ENTRYPOINT ["dotnet", "CineMagic.API.dll"]
