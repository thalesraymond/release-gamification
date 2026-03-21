## Why

The system currently tracks `ReleaseItem`s (GitHub PRs/Issues) and awards `DeveloperScore`s based on them. As noted in the Architect journal, the project release cadence is strictly weekly. However, there is no aggregated view of the week's gamification results or the overall release health. Providing a Weekly Release Summary Report builds upon the existing gamification trajectory (`developer-leaderboard`, `automated-github-feedback`) by providing a natural climax to the weekly event cycle without introducing real-time complexities.

## What Changes

- Create a `GenerateWeeklyReleaseSummary` use case that queries the `IMobileReleaseRepository` and `IDeveloperScoreRepository` for the past 7 days.
- Compile a summary including total points awarded, top 3 developers, and the number of `ReleaseItem`s per platform.
- Expose a `GET /summary/weekly` endpoint in the Fastify API to retrieve this report.
- Adhere to the existing Clean Architecture patterns and use MongoDB projections for optimal querying.

## Capabilities

### New Capabilities

- `weekly-release-summary`: Generates an aggregated weekly report of gamification results and release health metrics, exposing it via a new API endpoint.

### Modified Capabilities

## Impact

- **API**: New `GET /summary/weekly` endpoint will be added to the Fastify application.
- **Use Cases**: New `GenerateWeeklyReleaseSummary` use case.
- **Domain**: Potential updates to DTOs or entities to represent the aggregated summary data.
