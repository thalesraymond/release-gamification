## 1. Domain Updates

- [ ] 1.1 Update `ReleaseItemType` enum to include `SERVICENOW_CHANGE`.

## 2. Use Case Implementation

- [ ] 2.1 Create `ProcessServiceNowWebhookItemUseCase` in `packages/use-cases`.
- [ ] 2.2 Implement logic to parse ServiceNow payloads, map to `DeliveryServiceNowChangeDetails`, and upsert a `ReleaseItem`.

## 3. Fastify API Route

- [ ] 3.1 Create `POST /webhooks/servicenow` route in `apps/apis/src/routes`.
- [ ] 3.2 Add Zod schemas for ServiceNow payload validation.
- [ ] 3.3 Register the new route in the main Fastify application.

## 4. Testing & Validation

- [ ] 4.1 Write unit tests for `ProcessServiceNowWebhookItemUseCase`.
- [ ] 4.2 Write integration tests for the new Fastify route.
