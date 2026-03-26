## Context

The application currently parses GitHub webhooks for pull requests and issues to track contributions in releases. There's an unused domain entity, `DeliveryServiceNowChangeDetails`, representing an intention to track ServiceNow change management details alongside standard GitHub workflows. This expands the scope of gamification by incorporating the actual deployment aspect of a release.

## Goals / Non-Goals

**Goals:**
- Implement a Fastify route (`POST /webhooks/servicenow`) to ingest ServiceNow webhook payloads.
- Create a `ProcessServiceNowWebhookItemUseCase` that parses the webhook and creates/updates a `ReleaseItem`.
- Update the `ReleaseItemType` enum to include `SERVICENOW_CHANGE`.
- Update gamification to track ServiceNow contributions.

**Non-Goals:**
- Implementing a full two-way sync with ServiceNow.
- Creating a separate leaderboard for ServiceNow changes.
- Modifying the GitHub webhook processing logic.

## Decisions

- **Webhook Validation:** We will rely on simple shared-secret header validation (similar to the GitHub HMAC, or a simple token, depending on ServiceNow's standard capabilities, but for now we'll assume a basic secret check) to secure the `/webhooks/servicenow` endpoint.
- **Data Mapping:** We will use `DeliveryServiceNowChangeDetails` to map the incoming data before instantiating the `ReleaseItem`, keeping the domain model clean.

## Risks / Trade-offs

- **Risk:** ServiceNow payload structure changes or is inconsistent. -> **Mitigation:** Use strict Zod validation on the incoming Fastify route and fail fast with clear errors.
- **Trade-off:** Treating ServiceNow changes the same as GitHub PRs/Issues in the leaderboard might skew scores. -> **Mitigation:** The gamification engine (if it assigns weights) can easily assign a different point value to `SERVICENOW_CHANGE` items.
