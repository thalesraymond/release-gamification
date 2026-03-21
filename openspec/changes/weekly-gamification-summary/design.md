## Context

The gamification strategy relies on tracking GitHub Issues and PRs as they relate to `MobileRelease`s, allocating points to a developer leaderboard. Since mobile app releases inherently follow a weekly deployment cycle, real-time gamification feedback is misaligned with the primary event cadence. Developers will find more value in a summarized weekly report detailing their achievements (points earned, top contributors) connected directly to the week's release.

## Goals / Non-Goals

**Goals:**
- Provide a clear API endpoint to fetch aggregated gamification statistics for a given week (identified by the `MobileRelease` date or version).
- Implement a use-case layer aggregation function that pulls data from both the `MobileRelease` and the `DeveloperScore` (from the developer-leaderboard proposal).

**Non-Goals:**
- Sending email or Slack notifications directly from the backend. The API will simply provide the data, leaving CI/CD or other downstream clients to handle formatting and delivery.
- Complex point calculation rules based on time-of-day. The focus is strictly aggregation.

## Decisions

1. **Aggregation Strategy**: The summary will be generated on-demand via the `GET /gamification/weekly-summary` endpoint rather than pre-computed in a background job. Given the low scale (weekly), querying the MongoDB database for releases in a specific date range and joining with developer scores is computationally inexpensive and simpler to implement.
2. **Endpoint Input**: The new Fastify endpoint will accept optional query parameters like `startDate` and `endDate` (or `version`) to determine the scope of the summary. If omitted, it will default to the last 7 days.
3. **Domain Layer Support**: The `IMobileReleaseRepository` will be updated with a new method `findByDateRange(startDate, endDate)` to easily retrieve releases that fall within the specified week.

## Risks / Trade-offs

- **[Risk] Performance hit on large datasets**: While aggregating on-demand is fine for low volume, if the number of release items grows significantly, this query could become slow.
  - **Mitigation**: Use MongoDB aggregations and projections (as documented in the `.jules/architect.md` journal) to minimize data transferred to the Node process. If it becomes too slow, we can cache the result for past weeks.
