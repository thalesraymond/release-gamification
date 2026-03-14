## Why

Currently, the project only has domain entities (`ReleaseCalendar`, `MobileRelease`, etc.) but lacks the implementation for actually creating and storing release calendars. This change is necessary to provide the first functional use case for registering a release calendar and persisting it to a database, enabling the core feature of managing releases.

## What Changes

- **New Use Case**: Implement `CreateReleaseCalendar` extending a new `BaseUseCase` to handle common execution logic.
- **Repository Interface**: Define `IReleaseCalendarRepository` in the domain layer, extending a new `IBaseRepository`.
- **Infrastructure Implementation**: Implement `MongoReleaseCalendarRepository` using MongoDB for persistence, leveraging a `BaseMongoRepository` for common boilerplate.
- **Database Connection**: Implement a MongoDB connection manager that uses environment variables from a `.env` file, with support for `mongodb-memory-server` for development and testing.
- **DDD/Clean Architecture**: Ensure clear separation between domain, use cases, and infrastructure layers using adapters and interfaces, providing a scalable foundation with base classes.

## Capabilities

### New Capabilities

- `create-release-calendar`: Enables users to register a new release calendar with a unique name and manages its persistence.

### Modified Capabilities

<!-- No requirement changes for existing capabilities. -->

## Impact

- `packages/domain`: New `IReleaseCalendarRepository` interface and `CreateReleaseCalendar` use case.
- `packages/infrastructure`: New MongoDB repository implementation and connection logic.
- `.env`: New `MONGODB_URI` and `DB_NAME` environment variables.
- `packages/use-cases`: New use case implementation for creating release calendars.
