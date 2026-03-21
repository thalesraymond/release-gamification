## Why

The current system has endpoints to receive and process GitHub webhooks for Issues and PRs, and domain entities for `DeliveryServiceNowChangeDetails` exist, but there is no way for the application to receive ServiceNow change notifications. Since we already have the `DeliveryServiceNowChangeDetails` and handle `servicenow_change` types in the repository level, adding a webhook endpoint for ServiceNow changes is the logical next step to integrate with the change management system and ensure release items reflect actual deployment processes. This allows us to track when a change request is created or updated in ServiceNow for a specific release.

## What Changes

- Add a new webhook endpoint in `apps/apis/src/routes/servicenow-webhooks.ts` to receive POST requests from ServiceNow.
- The webhook should accept and validate ServiceNow change payload, which contains change number and description.
- Add a new use case `ProcessServiceNowWebhookItem` in `packages/use-cases` to process these webhook events.
- Update `app.ts` to register the new ServiceNow webhook route.
- The use case will parse the change details and map it to `ReleaseItem` using the existing `DeliveryServiceNowChangeDetails` entity.

## Capabilities

### New Capabilities
- `servicenow-webhook`: Receives, validates, and processes incoming webhooks from ServiceNow regarding change requests.

### Modified Capabilities

## Impact

- **API:** New `POST /webhooks/servicenow` endpoint added to the Fastify application.
- **Use Cases:** New `ProcessServiceNowWebhookItem` use case.
