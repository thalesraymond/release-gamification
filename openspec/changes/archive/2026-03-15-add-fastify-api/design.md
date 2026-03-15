## Context

Currently, the project has a domain, infrastructure, and use-cases layer in `packages/`. To make this functional, we need an entry point. This design proposes a new Fastify API in `apps/apis` that integrates these layers and exposes them via REST.

## Goals / Non-Goals

**Goals:**

- Create a secure-by-default Fastify API in `apps/apis`.
- Implement standard middlewares (CORS, Helmet, Rate Limiting).
- Use Zod for type-safe request/response validation.
- Expose the `CreateReleaseCalendar` use case as a REST endpoint.
- Provide automated API documentation via Swagger.
- Implement integration tests using `vitest` and `fastify.inject()`.

**Non-Goals:**

- Implementing authentication or authorization (will be handled in a future track).
- Complex UI (this is just the API).

## Decisions

- **Framework**: Fastify (Node.js). Why: Fastify is high-performance, developer-friendly, and has a great ecosystem of security-focused plugins.
- **Validation**: `fastify-type-provider-zod` + `zod`. Why: Provides end-to-end type safety between runtime validation and TypeScript.
- **Architecture**: The API will follow the "Controller" pattern, where routes call Use Cases. Dependency Injection will be used to inject repositories and use cases into the app.
- **Testing**: `vitest` with `fastify.inject()`. Why: Fastify's `inject` allows for fast integration tests without binding to a socket, making tests easier and faster to run in CI.

## Risks / Trade-offs

- [Risk] → Increased complexity by adding another application to the workspace.
- [Mitigation] → Use pnpm workspaces to share common configurations and dependencies.
- [Risk] → Potential for coupling between the API layer and specific infrastructure details.
- [Mitigation] → Ensure the API only depends on the `use-cases` and `domain` interfaces, with infrastructure details injected at the entry point.
