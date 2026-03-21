## Context

The `release-gamification` project tracks mobile releases and associates them with GitHub Pull Requests and Issues via webhooks. We want to extend the gamification to include developers reviewing pull requests.

## Goals / Non-Goals

**Goals:**
- Successfully process `pull_request_review` webhooks from GitHub.
- Store a `ReleaseItem` representing the review in the database.
- Attribute points to the developer who performed the review.

**Non-Goals:**
- Implementing the point awarding logic in `developer-leaderboard` directly (this is handled in the existing leaderboard capability or next step, but tracking is the focus here).
- Real-time updates to the UI (out of scope, sticking to Weekly or on-demand).

## Decisions

- Modify `ProcessGithubWebhookItemUseCase` instead of creating a new use-case to keep webhook processing centralized.
- Add `PULL_REQUEST_REVIEW` to `ReleaseItemType` to differentiate these items.
- The `number` field in `ReleaseItem` will still represent the PR number. The `url` will point to the specific review if possible, or just the PR.

## Risks / Trade-offs

- **Risk**: A single PR could have multiple reviews from the same person.
  - **Mitigation**: We must ensure the gamification logic handles duplicate review points appropriately, or we might need to deduplicate reviews per PR per user before upserting into the `ReleaseItem` repository. For now, tracking each review as a unique `ReleaseItem` is fine.
