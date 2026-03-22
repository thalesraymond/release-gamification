## 1. Domain Entities and Repositories

- [ ] 1.1 Create `Achievement` and `DeveloperAchievement` domain entities in `packages/domain/src`.
- [ ] 1.2 Define `IAchievementRepository` and `IDeveloperAchievementRepository` interfaces in `packages/domain/src`.

## 2. Use Cases

- [ ] 2.1 Implement `EvaluateAchievements` use case in `packages/use-cases/src`.
- [ ] 2.2 Implement `GetDeveloperAchievements` use case in `packages/use-cases/src`.

## 3. Infrastructure

- [ ] 3.1 Implement MongoDB repositories for `Achievement` and `DeveloperAchievement` in `packages/infrastructure/src`.
- [ ] 3.2 Update `DatabaseConnection` or dependency injection setup to include the new repositories.

## 4. Event Integration

- [ ] 4.1 Update `ProcessGithubWebhookItem` to emit a `ScoreAwarded` event (or similar).
- [ ] 4.2 Create an event listener that triggers the `EvaluateAchievements` use case when a score is awarded.

## 5. API Endpoints

- [ ] 5.1 Add `GET /developers/:username/achievements` endpoint in `apps/apis/src/routes`.
- [ ] 5.2 Add corresponding Zod schemas for the endpoint response.

## 6. Testing

- [ ] 6.1 Write unit tests for the new use cases.
- [ ] 6.2 Write integration tests for the new API endpoint and the event-driven achievement evaluation.
