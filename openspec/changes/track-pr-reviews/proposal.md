## Why

Code review is a critical component of release quality. The system currently tracks `ReleaseItem`s (GitHub PRs/Issues) and actively gamifies them via `developer-leaderboard` and `automated-github-feedback`. However, reviewing a PR is just as important as authoring one. By extending the system to track and reward PR reviews (e.g., approvals), we provide a more comprehensive gamification model that encourages collaboration, directly aligning with the project's goal of active developer engagement.

## What Changes

- Update `ProcessGithubWebhookItemUseCase` to process `pull_request_review` events, in addition to standard `pull_request` and `issue` events.
- Update the `ReleaseItemType` domain enum to include `PULL_REQUEST_REVIEW`.
- Modify the database schema to allow `ReleaseItem`s to represent reviews, perhaps by storing the reviewer's ID/username.
- Update the `developer-leaderboard` logic to award points for `PULL_REQUEST_REVIEW` items.

## Capabilities

### New Capabilities

- `track-pr-reviews`: Adds the ability to process GitHub pull request review webhook events, tracking them as `ReleaseItem`s for gamification scoring.

### Modified Capabilities

- `github-webhook`: The webhook processing logic will be modified to accept and parse `pull_request_review` payloads.
- `developer-leaderboard`: The scoring logic will be expanded to award points for the newly introduced `PULL_REQUEST_REVIEW` type.

## Impact

- **Domain:** `ReleaseItemType` enum will be updated.
- **Infrastructure:** `MongoReleaseItemRepository` might need indexing adjustments if queries change.
- **Use Cases:** `ProcessGithubWebhookItemUseCase` and `CalculateDeveloperScores` (from `developer-leaderboard`) will be modified.
- **API:** The `/webhooks/github` route will accept a new event type.
