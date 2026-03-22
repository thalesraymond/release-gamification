## Why
The system currently tracks `ReleaseItem`s (GitHub PRs/Issues) and awards `DeveloperScore`s based on them, and there's a leaderboard. To build upon this gamification trajectory and increase developer engagement without adding real-time complexities, introducing "Achievements" (or Badges) is the next logical step. Developers could earn specific badges for milestones like "First PR merged", "10 PRs merged in a single release cycle", or "Bug Squasher" (resolved 5 issues labeled 'bug').

## What Changes
- Add a new `Achievement` domain entity and `IAchievementRepository`.
- Create an `EvaluateAchievements` use case that runs periodically (or via a weekly chron job alongside the release summary) or listens to node `EventEmitter` when a `ReleaseItem` is processed.
- Expose a `GET /developers/:username/achievements` endpoint in the Fastify API.
- Introduce an `IDeveloperAchievementRepository` to track which developers have earned which badges.

## Capabilities

### New Capabilities
- `developer-achievements`: Evaluates and awards badges to developers based on their tracked `ReleaseItem` history and exposed via the Fastify API.

### Modified Capabilities
- None
