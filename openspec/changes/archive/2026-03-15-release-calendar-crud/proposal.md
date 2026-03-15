## Why

Currently, the system only supports creating a release calendar. To provide a full management experience, we need to implement the remaining CRUD operations (Get, List, Update, and Delete) across all layers: Domain, Use Cases, Infrastructure (MongoDB), and API (Fastify).

## What Changes

- **New Use Cases**:
  - `GetReleaseCalendar`: Retrieve a single calendar by ID.
  - `ListReleaseCalendars`: Retrieve all calendars.
  - `UpdateReleaseCalendar`: Modify an existing calendar (e.g., name).
  - `DeleteReleaseCalendar`: Remove a calendar by ID.
- **Infrastructure Updates**:
  - Implement `findById`, `findAll`, `update`, and `delete` in the MongoDB repository.
- **API Updates**:
  - `GET /release-calendars`: List all calendars.
  - `GET /release-calendars/:id`: Get one calendar.
  - `PUT /release-calendars/:id`: Update a calendar.
  - `DELETE /release-calendars/:id`: Delete a calendar.

## Capabilities

### New Capabilities

- `get-release-calendar`: Capability to retrieve a release calendar by its unique ID.
- `update-release-calendar`: Capability to update existing release calendar properties.
- `delete-release-calendar`: Capability to remove a release calendar from the system.
- `list-release-calendars`: Capability to list all available release calendars.

### Modified Capabilities

- `release-calendar-api`: Add the new REST endpoints (GET, PUT, DELETE) for release calendars.

## Impact

- **Domain**: Potential updates to `ReleaseCalendar` entity or repository interfaces.
- **Use Cases**: New classes for each operation.
- **Infrastructure**: New methods in `MongoReleaseCalendarRepository`.
- **API**: New route handlers and validation schemas in `apps/apis`.
- **Testing**: New integration and unit tests for each operation.
