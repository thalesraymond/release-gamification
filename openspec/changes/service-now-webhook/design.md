## Context

The system currently processes GitHub webhooks and has domain models ready for tracking ServiceNow changes (`DeliveryServiceNowChangeDetails`). However, the application lacks the ability to receive real-time notifications from ServiceNow. ServiceNow integrates with other systems via Outbound REST Messages or Webhooks when specific events occur (e.g., Change Request created or updated). Implementing this webhook endpoint closes a gap between backend capabilities and external system data sources, aligning with the domain-driven design already in place.

## Goals / Non-Goals

**Goals:**
- Provide a new Fastify route `POST /webhooks/servicenow` to handle incoming webhook payloads from ServiceNow.
- Implement a `ProcessServiceNowWebhookItem` use case that parses the payload, validates it, and saves a `ReleaseItem` using the `IReleaseItemRepository`.
- Properly map the ServiceNow change data to the existing `DeliveryServiceNowChangeDetails` polymorphic implementation.

**Non-Goals:**
- Syncing historical ServiceNow changes.
- Complex state-machine handling of ServiceNow change requests; we will focus on updating the basic details (Change Number, Description, Short Description).
- Sending responses back to ServiceNow other than standard HTTP success/failure codes.

## Decisions

**1. Authentication:**
ServiceNow webhooks will use a simple shared secret in the header (e.g., `x-servicenow-secret`) or HMAC signature similar to GitHub. For this implementation, we will use a configured header secret to validate the source of the webhook to ensure security.

**2. Fastify Route Integration:**
Similar to `github-webhooks.ts`, we will create `servicenow-webhooks.ts` that will define the route and schema using `zod` for payload validation. This adheres to the existing architectural pattern.

**3. Use Case Implementation:**
The `ProcessServiceNowWebhookItem` use case will check the provided release/version information in the payload, and if valid, map the change request details to a `ReleaseItem`. If the version information does not match an active or planned release, it will be ignored (similar to GitHub milestone constraints).

## Risks / Trade-offs

- **Risk:** ServiceNow payload formats can be highly customized depending on the instance configuration.
- **Mitigation:** Define a strict but minimal `zod` schema expecting only the essential fields (change number, short description, description, and target release version).

- **Risk:** Unauthorized webhook calls.
- **Mitigation:** Implement a secret token check in the Fastify route handler before processing the payload.
