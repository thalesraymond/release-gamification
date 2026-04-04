## Why

The current state actively gamifies individual contributions via `developer-leaderboard`, tracking `DeveloperScore`s for merged PRs and closed issues. However, modern engineering organizations work in teams. The domain layer already has a `Group` entity (`packages/domain/src/Group.ts`). As noted in the Architect journal, calculate aggregated metrics on the fly using MongoDB aggregation pipelines rather than storing duplicate state. Extending gamification to track team-level scores is the natural next step to increase collaborative engagement and close the gap between individual scores and team hierarchy.

## What Changes

- Create a `GetTeamLeaderboard` use case that aggregates individual `DeveloperScore`s based on their `Group` association.
- Implement a MongoDB aggregation pipeline in `DeveloperScoreRepository` to calculate group scores on the fly, avoiding duplicate state storage.
- Expose a `GET /leaderboard/teams` endpoint in the Fastify API.

## Capabilities

### New Capabilities

- `team-gamification-leaderboard`: Calculates and retrieves team-level scores dynamically based on individual developer scores and their associated groups.

### Modified Capabilities

- `developer-leaderboard`: The repository logic will be expanded to support aggregation by team/group.

## Impact

- **API:** New `GET /leaderboard/teams` endpoint will be added to the Fastify application.
- **Use Cases:** New `GetTeamLeaderboard` use case.
- **Infrastructure:** `DeveloperScoreRepository` will require a new aggregation method.
