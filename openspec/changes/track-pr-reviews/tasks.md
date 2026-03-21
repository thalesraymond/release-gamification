## 1. Domain Updates

- [ ] 1.1 Update `ReleaseItemType` enum to include `PULL_REQUEST_REVIEW`.

## 2. Use Case Updates

- [ ] 2.1 Update `ProcessGithubWebhookItemUseCase` to handle `pull_request_review` input payload.
- [ ] 2.2 Update `CalculateDeveloperScores` (or equivalent leaderboard logic) to award 5 points for `PULL_REQUEST_REVIEW` items.

## 3. API Updates

- [ ] 3.1 Update GitHub webhooks route to listen and parse `pull_request_review` events properly.

## 4. Tests

- [ ] 4.1 Add tests in the domain/use-cases layers for processing PR reviews.
- [ ] 4.2 Add integration tests for the `/webhooks/github` route testing the PR review logic.
