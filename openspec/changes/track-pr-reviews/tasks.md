## 1. Domain Updates

- [ ] 1.1 Update `ReleaseItemType` enum to include `PULL_REQUEST_REVIEW`.
- [ ] 1.2 Update `ReleaseItem` domain entity to include reviewer information (e.g., `reviewerId`).

## 2. Infrastructure Updates

- [ ] 2.1 Update `MongoReleaseItemRepository` to handle upserting of pull request reviews, ensuring multiple reviews for the same PR can be stored. This may involve changing the unique key for upsert operations and updating indexes.

## 3. Use Case Updates

- [ ] 3.1 Update `ProcessGithubWebhookItemUseCase` to handle `pull_request_review` input payload.
- [ ] 3.2 Update `CalculateDeveloperScores` (or equivalent leaderboard logic) to award 5 points for `PULL_REQUEST_REVIEW` items.

## 4. API Updates

- [ ] 4.1 Update GitHub webhooks route to listen and parse `pull_request_review` events properly.

## 5. Tests

- [ ] 5.1 Add tests in the domain/use-cases layers for processing PR reviews.
- [ ] 5.2 Add integration tests for the `/webhooks/github` route testing the PR review logic.
