## Context

The project tracks GitHub Issues and PRs (as `ReleaseItem`s) that are associated with a `MobileRelease`. To introduce gamification, we need to track points for developers based on their contributions. Currently, `ReleaseItem` stores the `url`, `state`, `type`, `repo`, `number`, `title`, `milestoneTitle`, `version`, and `platform`. We need a mechanism to extract the developer's identity (e.g., GitHub username) and assign points when a release is completed or when items are associated with it. Since `ReleaseItem` currently doesn't store the developer's identity, we might need to assume the identity is either added or we can use a mock/simplified approach for the leaderboard based on existing data, or extend `ReleaseItem` to include `author`.

For this change, we will keep it simple and introduce a `DeveloperScore` entity.

## Goals / Non-Goals

**Goals:**

- Implement a `DeveloperScore` domain entity and a MongoDB-backed repository to store scores.
- Create a `CalculateDeveloperScores` use case to aggregate points.
- Create a `GET /leaderboard` Fastify API endpoint.

**Non-Goals:**

- Real-time WebSocket updates for the leaderboard.
- Complex scoring rules (e.g., different points for different PR sizes).
- A frontend UI for the leaderboard (API only).

## Decisions

1. **Scoring Logic**: For simplicity, each `ReleaseItem` associated with a valid `MobileRelease` will award a fixed number of points (e.g., 10 points per PR/Issue) to its author. Since `ReleaseItem` currently lacks an `author` field, we will extend `ReleaseItem` to include an `author` string.
2. **Leaderboard Aggregation**: The leaderboard will be calculated on-the-fly or updated asynchronously. Given the expected scale, an on-the-fly aggregation via a database query or a simple `DeveloperScore` updated upon item creation is sufficient. We will use a `DeveloperScore` collection that is updated when `ReleaseItem`s are processed.
3. **Database**: We will use the existing MongoDB setup, adding a new collection for `DeveloperScores`. We will use MongoDB projections in repository retrieval methods to minimize data transfer, as noted in the Architect journal.

## Risks / Trade-offs

- **Risk**: Modifying the `ReleaseItem` entity requires updating existing webhook payloads and database schemas.
- **Mitigation**: We will make `author` an optional or default-valued field during the transition if necessary, but since we are in early development, we can just update the domain and webhook use case to extract the author from the GitHub webhook payload.
