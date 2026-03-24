## 1. Domain Setup

- [ ] 1.1 Create the `ISlackNotificationService` interface in the `packages/domain` module.

## 2. Infrastructure Setup

- [ ] 2.1 Implement `SlackNotificationService` in the `packages/infrastructure` module using a simple HTTP client to post to the `SLACK_WEBHOOK_URL` environment variable.
- [ ] 2.2 Write Vitest unit tests for `SlackNotificationService` to ensure it formats and sends the message payload correctly.

## 3. Use Case Implementation

- [ ] 3.1 Create the `BroadcastWeeklyLeaderboard` use case in `packages/use-cases`.
- [ ] 3.2 Ensure the use case retrieves data from `IDeveloperScoreRepository` (or equivalent) and passes it to the `ISlackNotificationService`.
- [ ] 3.3 Write Vitest unit tests for the `BroadcastWeeklyLeaderboard` use case.

## 4. API Integration

- [ ] 4.1 Expose a `POST /admin/broadcast-leaderboard` endpoint in the Fastify `apps/apis` module.
- [ ] 4.2 Secure the endpoint to check for a valid `x-admin-token` in the request headers.
- [ ] 4.3 Write a Fastify integration test for the new endpoint ensuring valid and invalid token behavior.
