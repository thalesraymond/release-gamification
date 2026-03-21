## Why

The codebase currently defines a `DeliveryServiceNowChangeDetails` domain model but lacks any mechanism to ingest this data. Following the established pattern from the recent `github-webhook-api` implementation (which successfully automated `ReleaseItem` tracking), building a ServiceNow webhook API is the logical next step. This will provide a complete picture of delivery items by allowing automated ingestion of ServiceNow changes, enriching the `MobileRelease` domain model without manual data entry.

## What Changes

- Create a new Fastify route in `apps/apis/src/routes/servicenow-webhooks.ts` to receive and validate incoming ServiceNow webhook payloads.
- Implement a new `ProcessServiceNowWebhookItem` use case in `packages/use-cases` to process the webhook events and map them to the `DeliveryServiceNowChangeDetails` entity.
- Update the `MongoReleaseItemRepository` in `packages/infrastructure` to persist these records, ensuring idempotency (e.g., updating existing records based on the ServiceNow `changeNumber`).

## Capabilities

### New Capabilities

- `servicenow-webhook`: Handles incoming ServiceNow webhooks for changes, validates data, and upserts them.

### Modified Capabilities

- None.

## Impact

- New API routes and controllers for the ServiceNow webhook.
- New use cases/services for processing ServiceNow webhook payloads.
- Database operations (repository layer) for upserting records.
