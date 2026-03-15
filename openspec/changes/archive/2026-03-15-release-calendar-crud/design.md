## Context

The current system has a `CreateReleaseCalendar` use case and a Fastify POST endpoint. We need to complete the CRUD operations (Read, Update, Delete) to allow full management of release calendars.

## Goals / Non-Goals

**Goals:**

- Implement `Get`, `List`, `Update`, and `Delete` use cases.
- Expose these operations via RESTful endpoints in the Fastify API.
- Ensure high test coverage for all new operations.
- Maintain the clean architecture boundaries.

**Non-Goals:**

- Implementing complex search or filtering in the list operation.
- Adding authentication/authorization (out of scope).

## Decisions

- **Use Cases**: Create dedicated classes for `GetReleaseCalendar`, `ListReleaseCalendars`, `UpdateReleaseCalendar`, and `DeleteReleaseCalendar`. This keeps each operation isolated and follows the Single Responsibility Principle.
- **Repository Interface**: Add `delete` method to `IReleaseCalendarRepository`. `findById` and `findAll` already exist. `update` can be handled by the existing `save` method (as it uses `upsert: true`) or a specific update if we want partial updates. For now, we will use `save` for full updates.
- **Infrastructure**: Implement `delete` in `MongoReleaseCalendarRepository`.
- **API (Fastify)**:
  - Add routes for each operation in `apps/apis/src/routes/release-calendars.ts`.
  - Use Zod schemas for request validation (params for IDs, body for updates).
- **Error Handling**: Standardize error mapping (e.g., "not found" error to 404, "conflict" to 409) across all new endpoints.

## Risks / Trade-offs

- [Risk] → Potential for data inconsistency if deletions are not handled carefully (e.g., if there were related entities).
- [Mitigation] → Ensure the `Delete` use case correctly handles the removal and that tests verify the state of the database after deletion.
- [Risk] → Increased code duplication in route definitions.
- [Mitigation] → Leverage Zod and Fastify plugin patterns to keep the route handlers concise.
