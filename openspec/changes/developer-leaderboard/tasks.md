## 1. Domain and Infrastructure Setup

- [ ] 1.1 Create `DeveloperScore` entity in `packages/domain/src/DeveloperScore.ts`
- [ ] 1.2 Create `IDeveloperScoreRepository` in `packages/domain/src/IDeveloperScoreRepository.ts`
- [ ] 1.3 Export new domain classes in `packages/domain/src/index.ts`
- [ ] 1.4 Implement `DeveloperScoreRepository` in `packages/infrastructure/src/DeveloperScoreRepository.ts`
- [ ] 1.5 Export `DeveloperScoreRepository` in `packages/infrastructure/src/index.ts`

## 2. Use Cases Implementation

- [ ] 2.1 Update `ProcessGithubWebhookItem` to extract author (if not present, add `author` to `ProcessGithubWebhookItemInput` and `ReleaseItem`)
- [ ] 2.2 Create `CalculateDeveloperScores` use case in `packages/use-cases/src/CalculateDeveloperScores.ts` (or integrate scoring directly into `ProcessGithubWebhookItemUseCase` for simplicity as designed)
- [ ] 2.3 Create `GetLeaderboard` use case in `packages/use-cases/src/GetLeaderboard.ts`
- [ ] 2.4 Export new use cases in `packages/use-cases/src/index.ts`

## 3. Fastify API Integration

- [ ] 3.1 Create `routes/leaderboard.ts` in `apps/apis/src/routes/leaderboard.ts`
- [ ] 3.2 Implement `GET /leaderboard` route
- [ ] 3.3 Register `/leaderboard` route in `apps/apis/src/app.ts`

## 4. Tests and Verification

- [ ] 4.1 Write tests for `DeveloperScoreRepository` in `packages/infrastructure/src/__tests__`
- [ ] 4.2 Write tests for `GetLeaderboard` and updated scoring logic in `packages/use-cases/src/__tests__`
- [ ] 4.3 Write API route tests for `GET /leaderboard` in `apps/apis/src/__tests__/leaderboard.test.ts`
- [ ] 4.4 Ensure all tests pass with `pnpm test`
