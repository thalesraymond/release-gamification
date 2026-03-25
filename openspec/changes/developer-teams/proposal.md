## Why

The system currently tracks `ReleaseItem`s and gamifies contributions by awarding points for GitHub PRs and Issues on an individual basis via `developer-leaderboard`. However, modern development is often a team effort. Introducing "Teams" (or Squads) allows developers to pool their points, fostering friendly competition and collaboration between different groups within the organization. This naturally extends the gamification trajectory without introducing entirely new infrastructure, leveraging the existing score calculation logic.

## What Changes

- Add `Team` and `TeamMember` domain entities, and `ITeamRepository`.
- Add a `TeamLeaderboard` use case that aggregates individual developer scores based on their team affiliations.
- Expose a `GET /teams/leaderboard` endpoint in the Fastify API.
- Create use cases to manage teams (`CreateTeam`, `AddTeamMember`).

## Capabilities

### New Capabilities

- `developer-teams`: Allows developers to join teams and aggregates their individual gamification scores into a team-based leaderboard.

### Modified Capabilities

- None
