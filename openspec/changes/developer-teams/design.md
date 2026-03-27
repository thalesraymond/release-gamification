## Context

The current gamification system tracks individual developer contributions via `DeveloperScore` and `ReleaseItem`s. The leaderboard currently only ranks individual developers. However, software development is highly collaborative. To further boost engagement, we want to introduce "Teams" so developers can compete as units, rather than solely as individuals. This builds upon the `developer-leaderboard` and the upcoming `weekly-release-summary-report` features. We must integrate these teams with the existing Clean Architecture boundaries, persisting team configurations in MongoDB and exposing them via the Fastify API.

## Goals / Non-Goals

**Goals:**

- Provide a mechanism to create, update, and read developer teams.
- Aggregate developer scores at the team level for the leaderboard.
- Persist team memberships securely and efficiently.
- Align with the existing weekly release cadence and event cycle.

**Non-Goals:**

- We will NOT implement granular permission controls (e.g., "Team Admin" vs "Team Member").
- We will NOT support developers belonging to multiple teams simultaneously in this iteration to keep scoring logic simple.

## Decisions

- **Team Persistence:** `DeveloperTeam` will be a new top-level aggregate root in the domain layer, persisted in a dedicated MongoDB collection (`developerTeams`).
- **Scoring Aggregation:** Instead of redundantly storing team scores, we will dynamically aggregate team scores based on their members' individual `DeveloperScore`s during the `GET /leaderboard/teams` request. This satisfies the architectural rule of calculating aggregated metrics on the fly (per Architect's journal) and simplifies data consistency.
- **Member Representation:** Team members will be stored simply as an array of GitHub usernames (strings) within the `DeveloperTeam` document, mapping directly to the identifiers used in `DeveloperScore`.

## Risks / Trade-offs

- **Risk:** Calculating team scores dynamically might become slow as the number of developers and teams grows.
  - **Mitigation:** If performance degrades, we can implement MongoDB aggregation pipelines for the team score calculation, or utilize basic caching at the API layer, given that the underlying data (`DeveloperScore`) updates primarily via webhooks. For now, the in-memory array aggregation is sufficient given the weekly cadence constraint.

## Migration Plan

- Deploy the new schema and use cases.
- Expose the new Fastify API endpoints.
- No historical data migration is required, as teams are a net-new construct.

## Open Questions

- None at this time.
