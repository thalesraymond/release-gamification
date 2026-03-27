## Why

The gamification system currently tracks individual developer contributions (`DeveloperScore`) through the `developer-leaderboard` and `automated-github-feedback`. However, software development is inherently collaborative. A natural next step in the gamification trajectory is to allow developers to form teams or squads. This encourages collective effort and team-level friendly competition, directly aligning with the project's goal of active developer engagement without introducing out-of-scope real-time complexities.

## What Changes

- Create a `DeveloperTeam` domain entity to represent a group of developers.
- Implement an `IDeveloperTeamRepository` for persisting team configurations.
- Add use cases for creating teams, adding/removing members, and listing teams (`CreateDeveloperTeam`, `ManageTeamMembers`, `ListDeveloperTeams`).
- Update the `GET /leaderboard` endpoint (or create a new `GET /leaderboard/teams` endpoint) to calculate and return aggregate team scores dynamically based on the scores of the team's members.
- Expose basic RESTful endpoints in the Fastify API for team management (`POST /teams`, `GET /teams`, `PUT /teams/:id/members`).

## Capabilities

### New Capabilities

- `developer-teams`: Allows the creation and management of developer teams, and provides team-based scoring aggregation for the leaderboard.

### Modified Capabilities

- `developer-leaderboard`: Will be extended to support team-level aggregations.

## Impact

- **API:** New `/teams` endpoints will be added to the Fastify application.
- **Domain:** New `DeveloperTeam` entity and repository interface.
- **Use Cases:** New use cases for team management.
- **Infrastructure:** Implementation of the team repository using MongoDB.
