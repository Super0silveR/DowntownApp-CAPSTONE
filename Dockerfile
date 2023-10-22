FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env
WORKDIR /app

# copy .csproj and restore as distinct layers.
COPY "DowntownApp.sln" "DowntownApp.sln"
COPY "Api/Api.csproj" "Api/Api.csproj"
COPY "Application/Application.csproj" "Application/Application.csproj"
COPY "Domain/Domain.csproj" "Domain/Domain.csproj"
COPY "Infrastructure/Infrastructure.csproj" "Infrastructure/Infrastructure.csproj"
COPY "Persistence/Persistence.csproj" "Persistence/Persistence.csproj"

RUN dotnet restore "DowntownApp.sln"

# copy everything else and BUILD.
COPY . .
RUN dotnet publish -c Release -o out

# build a runtime image.
FROM mcr.microsoft.com/dotnet/aspnet:6.0
COPY --from=build-env /app/out .
ENTRYPOINT [ "dotnet", "Api.dll" ]