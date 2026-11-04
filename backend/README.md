# Honey Media House API

Independent Spring Boot REST API foundation for future Next.js integration. The only implemented route is `GET /api/v1/health`; it runs `SELECT 1` over PostgreSQL and returns `200 {"status":"UP","database":"UP"}` when connected, or generic `503 {"status":"DOWN","database":"DOWN"}` when the configured database is unavailable. No database credentials or driver details are returned.

## Requirements and run

- Java 21
- Maven 3.9+
- PostgreSQL 14+ for a live connectivity check

From this directory, configure environment variables (do not commit them):

```sh
export SPRING_DATASOURCE_URL='jdbc:postgresql://localhost:5432/honey_media_house_api'
export SPRING_DATASOURCE_USERNAME='your_local_role'
export SPRING_DATASOURCE_PASSWORD='your_local_password'
mvn spring-boot:run
```

The API listens on port 8081 by default. Override it with `SERVER_PORT`. Build and unit tests:

```sh
mvn test
```

The health controller tests mock JDBC. They confirm generic outage behavior without needing a live DB. Use an isolated PostgreSQL instance you control to confirm real credentials and network connectivity.

## Schema ownership and roadmap

This starter has no JPA entities, Flyway migrations, or schema initialization. It does not assume ownership of any Prisma tables. Prisma remains the current application's only owner for its existing schema and writes. The parent [README migration roadmap](../README.md#spring-boot--postgresql-backend-roadmap) covers backup/inventory, isolated ownership, domain-at-a-time migration, API auth, Next integration, verification, and rollback planning.
