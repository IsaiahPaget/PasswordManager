FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER $APP_UID
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["PasswordManager.Web/PasswordManager.Web.csproj", "PasswordManager.Web/"]
COPY ["PasswordManager.Data/PasswordManager.Data.csproj", "PasswordManager.Data/"]
COPY ["PasswordManager.Services/PasswordManager.Services.csproj", "PasswordManager.Services/"]
RUN dotnet restore "PasswordManager.Web/PasswordManager.Web.csproj"
COPY . .
WORKDIR "/src/PasswordManager.Web"
RUN dotnet build "PasswordManager.Web.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "PasswordManager.Web.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "PasswordManager.Web.dll"]
