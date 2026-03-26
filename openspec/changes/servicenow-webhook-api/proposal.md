## Why

The system handles tracking via `ProcessGithubWebhookItemUseCase`, indicating data ingestion relies on webhooks. The `IDeliveryDetails` domain interface contains an unused implementation, `DeliveryServiceNowChangeDetails`, suggesting plans to integrate with ServiceNow alongside GitHub. To increase the gamification domain footprint and utilize existing domain entities, implementing a webhook integration for ServiceNow changes is a logical next step. This provides a more comprehensive view of developer contributions across the release lifecycle.

## What Changes

- Create a `ProcessServiceNowWebhookItemUseCase` to map incoming ServiceNow payload data to `DeliveryServiceNowChangeDetails` and associate it with a `ReleaseItem`.
- Expose a `POST /webhooks/servicenow` endpoint in the Fastify API to receive change updates from ServiceNow.
- Update `ReleaseItemType` and relevant parsers to support the new `servicenow_change` type.

## Capabilities

### New Capabilities

- `servicenow-webhook`: Adds the ability to process ServiceNow change webhook events, tracking them as `ReleaseItem`s for gamification scoring.

### Modified Capabilities

- `developer-leaderboard`: The scoring logic will be expanded to award points for the newly introduced `SERVICENOW_CHANGE` type.

## Impact

- **Domain:** `ReleaseItemType` enum will be updated.
- **Infrastructure:** `MongoReleaseItemRepository` might need indexing adjustments if queries change.
- **Use Cases:** `ProcessServiceNowWebhookItemUseCase` and `CalculateDeveloperScores` (from `developer-leaderboard`) will be modified.
- **API:** The `/webhooks/servicenow` route will be created to accept a new event type.
