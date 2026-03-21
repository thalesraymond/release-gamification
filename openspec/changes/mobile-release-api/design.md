## Context

The backend currently listens to GitHub webhooks, processes them via `ProcessGithubWebhookItemUseCase`, and stores `MobileRelease` and `ReleaseItem` entities into MongoDB via `MongoMobileReleaseRepository` and `MongoReleaseItemRepository`. However, there is no way for external clients (like a React frontend) to query these entities to display a list of recent releases or the details of a specific release. Adding read endpoints for mobile releases is the obvious next logical step to bridge the gap between backend data collection and frontend consumption.

## Goals / Non-Goals

**Goals:**

- Implement `ListMobileReleases` and `GetMobileRelease` use cases.
- Create `/mobile-releases` and `/mobile-releases/:id` Fastify API endpoints.
- Enhance the `MongoMobileReleaseRepository` with `findAll` and `findById` methods, adhering to the architectural rule to use MongoDB projections (e.g., `.project({ _id: 0 })`) for optimal performance and memory usage.

**Non-Goals:**

- Creating, updating, or deleting `MobileRelease` entities through these APIs (these operations are strictly managed by webhooks/automation currently).
- Complex filtering or advanced search capabilities; simple listing (optionally with basic pagination) is sufficient.

## Decisions

1. **API Endpoints**: The Fastify server will expose two new GET routes: `/mobile-releases` (for listing) and `/mobile-releases/:id` (for detail).
2. **Database Queries**: The repositories will be extended to support retrieval queries. To comply with the `architect.md` performance convention, we will use `.project({ _id: 0, /* specific fields */ })` to only fetch the data required to instantiate the domain objects.
3. **Data Hydration**: For the detail view (`GET /mobile-releases/:id`), the API will fetch the `MobileRelease` and potentially its associated `ReleaseItem`s via the `ReleaseItemRepository` if they are not fully embedded, ensuring a complete view of the release content.

## Risks / Trade-offs

- **Risk**: Returning a large number of releases might lead to performance issues.
- **Mitigation**: Implement simple limit/offset pagination in `ListMobileReleases` and enforce a reasonable maximum limit per request.
