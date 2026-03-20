## 1. Domain & Entities

- [ ] 1.1 Define `ReleaseItem` entity and its properties (title, state, type, milestone, etc.)
- [ ] 1.2 Implement milestone validation logic (extracting version and platform)
- [ ] 1.3 Define `ReleaseItemRepository` interface

## 2. Use Cases

- [ ] 2.1 Create `ProcessGithubWebhookItemUseCase` to orchestrate validation and saving
- [ ] 2.2 Add unit tests for `ProcessGithubWebhookItemUseCase` and milestone validation logic

## 3. Infrastructure & Data

- [ ] 3.1 Implement `ReleaseItemRepository` using the ORM (Prisma/etc.) with an upsert operation based on `(repo + number)`
- [ ] 3.2 Add integration tests for the repository upsert method

## 4. API & Delivery

- [ ] 4.1 Create Fastify controller for the GitHub webhook endpoint (`POST /api/webhooks/github`)
- [ ] 4.2 Implement payload validation schema (JSON Schema / Zod) for the webhook route
- [ ] 4.3 Setup dependency injection for the controller, use case, and repository
- [ ] 4.4 Register the new route in the main Fastify application
- [ ] 4.5 Add end-to-end/integration tests for the webhook endpoint
