## Context

The system tracks GitHub Issues and PRs via webhooks and stores them as `ReleaseItem`s associated with `MobileRelease`s. The system is transitioning to a gamification model where developers earn points. The system release cadence is strictly weekly. There is no aggregated view of the week's gamification results or the overall release health. Providing a Weekly Release Summary Report builds upon the existing gamification trajectory by providing a natural climax to the weekly event cycle without introducing real-time complexities.

## Goals / Non-Goals

**Goals:**
- Implement a `WeeklyReleaseSummary` domain entity to represent the aggregated report.
- Create a `GenerateWeeklyReleaseSummaryUseCase` to aggregate data from the past 7 days.
- Create a `GET /summary/weekly` Fastify API endpoint.

**Non-Goals:**
- Real-time updates for the summary.
- A frontend UI for the summary (API only).

## Decisions

1. **Aggregation Logic**: The `GenerateWeeklyReleaseSummaryUseCase` will query `IMobileReleaseRepository` and `IDeveloperScoreRepository` to aggregate data for the past 7 days.
2. **Performance**: We will use MongoDB projections in repository retrieval methods to minimize data transfer, as noted in the Architect journal.

## Risks / Trade-offs

- **Risk**: The aggregation query might become slow if the number of `ReleaseItem`s or `DeveloperScore`s is large.
- **Mitigation**: Using MongoDB projections and indexes will mitigate performance issues. The weekly cadence means the query volume is low.
