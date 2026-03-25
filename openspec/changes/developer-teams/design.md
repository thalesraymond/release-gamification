## Context

The system currently gamifies developer contributions by awarding points for GitHub PRs and Issues, tracking this via a developer leaderboard. This gamification is tied to a strictly weekly release cadence. Introducing "Teams" (or Squads) adds a new layer of engagement, allowing developers to pool points and fostering friendly competition. This change aligns with the existing architecture and builds upon the `developer-leaderboard` feature.

## Goals / Non-Goals

**Goals:**
- Define domain models for `Team` and `TeamMember`.
- Create a mechanism to associate developers with a team.
- Expose an API endpoint to retrieve a ranked leaderboard of teams based on aggregate developer scores.
- Persist team data using MongoDB and follow existing Clean Architecture patterns.

**Non-Goals:**
- Complex role-based access control (RBAC) for team management. Any developer can join or create a team for now.
- Real-time websocket updates for team scores.
- Integration with external team management systems (e.g., Okta, Active Directory).

## Decisions

- **Data Storage:** MongoDB collections will be used to store `Team` definitions (e.g., "Frontend Ninjas") and `TeamMember` records mapping usernames to team IDs. This follows the established pattern of storing relational-like data in document collections.
- **Score Aggregation:** Team scores will be calculated on the fly by querying the `DeveloperScore`s of all members within that team. This avoids duplicating state and ensures accuracy, leveraging MongoDB aggregation pipelines or simple map-reduce in the application layer.

## Risks / Trade-offs

- **Risk:** Performance degradation when calculating team leaderboards if the number of developers/teams grows significantly.
  - **Mitigation:** Use MongoDB aggregation pipelines for efficient score calculation, similar to existing projection patterns. Given the context (weekly cadence, likely internal team sizes), on-the-fly calculation is acceptable for this iteration. If performance becomes an issue later, we can introduce caching.
