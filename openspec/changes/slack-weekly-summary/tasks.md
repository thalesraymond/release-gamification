## 1. Domain Layer

- [ ] 1.1 Create `ISlackNotificationService.ts` in `packages/domain/src/`

## 2. Infrastructure Layer

- [ ] 2.1 Implement `SlackNotificationService` in `packages/infrastructure/src/` using a simple HTTP POST request (e.g., `fetch` or `axios`).
- [ ] 2.2 Add unit tests for `SlackNotificationService`.

## 3. Use Case Layer

- [ ] 3.1 Create `BroadcastWeeklySummaryUseCase` that depends on `GenerateWeeklyReleaseSummaryUseCase` (or its underlying repositories) and `ISlackNotificationService`.
- [ ] 3.2 Add unit tests for `BroadcastWeeklySummaryUseCase`.

## 4. API Layer (apps/apis)

- [ ] 4.1 Install `node-cron` dependency.
- [ ] 4.2 Create a scheduled task (e.g., in a `src/plugins/scheduler.ts` or similar initialization script) that instantiates and runs the `BroadcastWeeklySummaryUseCase`.
- [ ] 4.3 Configure the schedule to run weekly (e.g., Fridays at 17:00).
- [ ] 4.4 Add `SLACK_WEBHOOK_URL` to environment variable validation (`env.ts` or similar).
