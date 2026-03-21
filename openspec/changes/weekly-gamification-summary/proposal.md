## Why

The current gamification model tracks points using a developer leaderboard based on contributions to mobile releases. However, since mobile releases happen on a weekly cadence, providing a summarized view of gamification results at the end of each weekly cycle is crucial. Real-time updates were deemed unnecessary because the primary event (the release) is weekly. A weekly summary aligns perfectly with the established `MobileRelease` domain and provides developers with structured, meaningful feedback on their contributions per release cycle.

## What Changes

- Add a cron-like schedule or an endpoint (e.g., triggered via CI/CD at the end of the release week) to compile gamification results for the week.
- Create a `GenerateWeeklySummary` use case that aggregates all `DeveloperScore` changes and `ReleaseItem` contributions associated with the `MobileRelease`s finalized in the past week.
- Expose an API endpoint `GET /gamification/weekly-summary` that returns the aggregated gamification stats (e.g., top contributors, total points awarded, issues closed, PRs merged) for the specified release week.

## Capabilities

### New Capabilities

- `weekly-gamification-summary`: Generates and retrieves an aggregated report of developer contributions and scores for a specific weekly release cycle.

### Modified Capabilities

- `developer-leaderboard`: Will be utilized by the summary to determine score changes specific to the weekly timeframe.

## Impact

- **API:** Adds a new `GET /gamification/weekly-summary` endpoint.
- **Use Cases:** Introduces `GenerateWeeklySummary` to aggregate data based on release dates.
- **Domain:** May require methods to filter `MobileRelease`s by a specific date range (the release week).
