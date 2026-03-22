## 1. Domain Entities and Repositories

- [ ] 1.1 Update `DeliveryGithubIssueDetails` to include a `labels` string array property.
- [ ] 1.2 Create `Achievement` and `DeveloperAchievement` domain entities in `packages/domain/src`.
- [ ] 1.3 Define `IAchievementRepository` and `IDeveloperAchievementRepository` interfaces in `packages/domain/src`.

## 2. Use Cases

- [ ] 2.1 Update `ProcessGithubWebhookItem` to extract issue labels from the webhook payload and populate the updated `DeliveryDetails`.
- [ ] 2.2 Identify the component responsible for awarding scores (e.g., `AwardDeveloperScore`) and update it to emit a `ScoreAwarded` event.
- [ ] 2.3 Implement `EvaluateAchievements` use case in `packages/use-cases/src`.
- [ ] 2.4 Implement `GetDeveloperAchievements` use case in `packages/use-cases/src`.

## 3. Infrastructure

- [ ] 3.1 Implement MongoDB repositories for `Achievement` and `DeveloperAchievement` in `packages/infrastructure/src`.
- [ ] 3.2 Update `DatabaseConnection` or dependency injection setup to include the new repositories.

## 4. Event Integration

- [ ] 4.1 Create an event listener that triggers the `EvaluateAchievements` use case when a `ScoreAwarded` event is received.

## 5. API Endpoints

- [ ] 5.1 Add `GET /developers/:username/achievements` endpoint in `apps/apis/src/routes`.
- [ ] 5.2 Add corresponding Zod schemas for the endpoint response.

## 6. Testing

- [ ] 6.1 Update `ProcessGithubWebhookItem` tests to verify label persistence.
- [ ] 6.2 Write unit tests for the new use cases and event integration.
- [ ] 6.3 Write integration tests for the new API endpoint and the event-driven achievement evaluation.
