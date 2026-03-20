## Why

We need to track GitHub issues and Pull Requests by associating them with mobile releases. This solves the problem of manually tracking release items and ensures they are properly registered in the database, provided they are associated with a valid milestone (which specifies the version and platform).

## What Changes

- Create a new API endpoint to function as a GitHub webhook for Issues and Pull Requests.
- Implement logic to validate milestones: a milestone is valid only if its title contains both a version and a platform.
- Register valid issues/PRs as `ReleaseItems` in the database.
- Ensure idempotency: updating an existing PR/Issue (identified uniquely by `repo/owner + number`) must update the existing database record rather than inserting a new one.
- Follow Clean Architecture and SOLID principles for the new components.

## Capabilities

### New Capabilities

- `github-webhook`: Handles incoming GitHub webhooks for issues and PRs, validates milestones, and upserts `ReleaseItems`.

### Modified Capabilities

## Impact

- New API routes and controllers for the GitHub webhook.
- New use cases/services for processing GitHub webhook payloads.
- Database operations (repository layer) for upserting `ReleaseItems` based on `repo/owner + number`.
