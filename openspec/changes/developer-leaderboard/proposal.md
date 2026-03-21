## Why

The project is named "release-gamification", but currently only tracks mobile releases and GitHub PRs/Issues without any actual gamification elements. To fulfill the project's core mission and improve developer engagement, we need to implement a scoring system that assigns points to developers for their contributions (e.g., merged PRs, closed issues) to successful mobile releases. This fits perfectly with the established `MobileRelease` and `ReleaseItem` tracking.

## What Changes

- Create a `DeveloperScore` domain entity to track points accumulated by developers.
- Add a `CalculateDeveloperScores` use case that awards points based on the `ReleaseItem`s associated with a `MobileRelease`.
- Expose a `GET /leaderboard` Fastify API endpoint to retrieve ranked developer scores.
- Create an `IDeveloperScoreRepository` for data persistence.

## Capabilities

### New Capabilities

- `developer-leaderboard`: Calculates, stores, and retrieves scores for developers based on their contributions to releases, providing a ranked leaderboard.

### Modified Capabilities

## Impact

- **API:** New `GET /leaderboard` endpoint will be added to the Fastify application.
- **Domain:** New `DeveloperScore` entity and `IDeveloperScoreRepository` interface.
- **Use Cases:** New `CalculateDeveloperScores` and `GetLeaderboard` use cases.
- **Infrastructure:** Implementation of `DeveloperScoreRepository` using MongoDB.
