## Why

Currently, the system tracks mobile releases internally via webhooks and stores them in the database (`MobileRelease` domain entity), but there is no way to view or retrieve these releases. To make the release gamification system useful, we need a way for frontends or other clients to query and display the `MobileRelease`s and their associated `ReleaseItem`s. Providing a read-only API is the natural next step.

## What Changes

- Add a `ListMobileReleases` use case to retrieve paginated or all mobile releases from the database.
- Add a `GetMobileRelease` use case to fetch a specific mobile release by its ID.
- Expose a `GET /mobile-releases` Fastify API endpoint to list mobile releases.
- Expose a `GET /mobile-releases/:id` Fastify API endpoint to get details of a single mobile release, including its `ReleaseItem`s.

## Capabilities

### New Capabilities

- `mobile-release-api`: Provides RESTful endpoints to list and retrieve mobile releases and their associated items.

### Modified Capabilities

## Impact

- **API:** New `GET /mobile-releases` and `GET /mobile-releases/:id` endpoints will be added to the Fastify application.
- **Use Cases:** New `ListMobileReleases` and `GetMobileRelease` use cases.
- **Infrastructure:** Implementation of find methods using projections in `MongoMobileReleaseRepository`.
