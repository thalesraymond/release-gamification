## Context

The project follows Clean Architecture and DDD principles. Currently, we have the domain entities defined in `packages/domain`. We need to implement the first use case for creating release calendars and the infrastructure for MongoDB persistence, using base classes for future extensibility and `mongodb-memory-server` for early development.

## Goals / Non-Goals

**Goals:**

- Implement a `BaseUseCase` in the use-case layer to encapsulate common execution flow.
- Implement a `CreateReleaseCalendar` use case extending `BaseUseCase`.
- Define an `IBaseRepository` interface in the domain layer.
- Implement a `BaseMongoRepository` in the infrastructure layer.
- Implement `MongoReleaseCalendarRepository` for persisting `ReleaseCalendar` entities.
- Support `mongodb-memory-server` for local development and testing to remove initial database setup friction.
- Use environment variables (`.env`) for database configuration.

**Non-Goals:**

- Implementing other use cases like updating or deleting release calendars.
- Implementing a full-blown REST API or CLI.
- Handling complex release calendar migrations.

## Decisions

### 1. Base Classes for Use Cases and Repositories

We will introduce `BaseUseCase<Input, Output>` to provide a standard `execute` method signature. For repositories, `IBaseRepository<Entity>` will define standard operations (save, findById, etc.), and `BaseMongoRepository` will handle common MongoDB-specific logic like connection retrieval and basic CRUD.

### 2. Repository Interface in Domain

The `IReleaseCalendarRepository` interface will extend `IBaseRepository<ReleaseCalendar>` and be defined in `packages/domain`.

### 3. Infrastructure with mongodb-memory-server

To facilitate rapid development and reliable testing, the database connection manager will be configured to start and use `mongodb-memory-server` when no `MONGODB_URI` is provided or specifically in development mode.

### 4. Connection Management via .env

`packages/infrastructure/src/database.ts` will use `dotenv` and support either a real MongoDB URI or start a memory server.

### 5. Testing Strategy

All new packages (`use-cases`, `infrastructure`) will implement the same testing standards as `packages/domain`:

- **Vitest**: Use `vitest` with `v8` coverage provider.
- **Type Safety**: Use `tsconfig.test.json` to ensure tests are type-checked against the implementation.
- **High Coverage**: Enforce a minimum of 90% code coverage for all new logic.
- **Consistent Setup**: Mirror `vitest.config.ts` and setup files from the domain package.

## Risks / Trade-offs

- **[Risk]** Complexity of base classes → **[Mitigation]** Keep base classes lean; only add common cross-cutting concerns (like logging or error formatting) when they are truly generic.
- **[Risk]** Memory server behavior vs Production MongoDB → **[Mitigation]** The repository implementation should use standard MongoDB driver features that behave consistently across both.
- **[Risk]** Data leak from Infrastructure to Domain → **[Mitigation]** Use a mapper/adapter in the infrastructure layer to convert between MongoDB documents and Domain entities.
