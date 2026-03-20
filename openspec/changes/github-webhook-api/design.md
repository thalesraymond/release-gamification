## Context

We need to capture GitHub Issues and Pull Requests and associate them with mobile releases as `ReleaseItems`. This requires an endpoint to receive GitHub webhook events and process them according to specific business rules (Clean Architecture & SOLID).

## Goals / Non-Goals

**Goals:**

- Provide a scalable webhook endpoint for GitHub.
- Extract and validate milestone constraints (must contain version and platform).
- Upsert valid items into the database to prevent duplicates (idempotency using `repo/owner + number`).

**Non-Goals:**

- Processing events other than Issues and Pull Requests.
- Retroactive processing of existing issues/PRs before the webhook is installed.

## Decisions

1. **Clean Architecture Layers**:
   - **Delivery/API**: A Fastify controller/route to receive webhook payloads.
   - **Use Case**: `ProcessGithubWebhookItemUseCase` to orchestrate validation, mapping, and saving.
   - **Domain**: Entities and value objects representing the `ReleaseItem` and the validation logic for `Milestone`.
   - **Infrastructure/Data**: Repository implementation using Prisma (or current ORM) with an `upsert` operation.

2. **Milestone Validation**:
   - Logic placed in a domain service or value object to parse the milestone title and ensure it meets the `<version>` and `<platform>` criteria.

3. **Idempotency Strategy**:
   - The unique identifier for a `ReleaseItem` originating from GitHub will be a composite of `repository.full_name` (owner/repo) and `number` (issue or PR number).
   - Database operations will use an `upsert` (update if exists, insert if new) based on this unique key.

## Risks / Trade-offs

- **[Risk] Unverified Payloads**: Anyone could hit the webhook if not secured.
  → **Mitigation**: Implement GitHub webhook secret validation (HMAC signature verification) in existing or new middleware.
- **[Risk] High volume of events**: GitHub sends many events for a single PR (opened, edited, synchronized).
  → **Mitigation**: The upsert operation ensures the database is correctly synced without growing indefinitely.
