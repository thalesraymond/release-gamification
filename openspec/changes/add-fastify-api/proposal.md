## Why

As the project grows, we need a robust and secure way to expose our domain logic and use cases through a web API. Fastify provides a high-performance framework that aligns with our clean architecture, allowing us to build a scalable and well-tested entry point for our services.

## What Changes

- Create a new Fastify application in `apps/apis`.
- Implement core API features: security (Fastify plugins), sane defaults, and shared middlewares/validators.
- Integrate the `CreateReleaseCalendar` use case as a REST endpoint.
- Add integration tests using `vitest` for the new API endpoints.

## Capabilities

### New Capabilities

- `fastify-api-core`: A foundational Fastify setup with security plugins (CORS, Helmet), request validation, and standard error handling.
- `release-calendar-api`: A RESTful endpoint (`POST /release-calendars`) that triggers the `CreateReleaseCalendar` use case from the `use-cases` package.

### Modified Capabilities

- None.

## Impact

- **New App**: `apps/apis` will be the primary entry point for external requests.
- **Dependencies**: New dependencies on `fastify`, `@fastify/helmet`, `@fastify/cors`, and validation libraries (like `zod` or `ajv`).
- **Integration**: The API will depend on `packages/use-cases` and `packages/infrastructure`.
