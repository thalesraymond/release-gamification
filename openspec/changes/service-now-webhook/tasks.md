## 1. Fastify API Integration

- [ ] 1.1 Create `routes/servicenow-webhooks.ts` in `apps/apis/src/routes/servicenow-webhooks.ts`.
- [ ] 1.2 Implement `POST /webhooks/servicenow` route with Zod validation.
- [ ] 1.3 Register `/webhooks/servicenow` route in `apps/apis/src/app.ts`.

## 2. Use Cases Implementation

- [ ] 2.1 Create `ProcessServiceNowWebhookItem` use case in `packages/use-cases/src/ProcessServiceNowWebhookItem.ts`.
- [ ] 2.2 Map the payload data into `DeliveryServiceNowChangeDetails` and upsert the `ReleaseItem`.
- [ ] 2.3 Export the new use case in `packages/use-cases/src/index.ts`.

## 3. Tests and Verification

- [ ] 3.1 Write tests for `ProcessServiceNowWebhookItem` in `packages/use-cases/src/__tests__`.
- [ ] 3.2 Write API route tests for `POST /webhooks/servicenow` in `apps/apis/src/__tests__/servicenow-webhooks.test.ts`.
- [ ] 3.3 Ensure all tests pass with `pnpm test`.
