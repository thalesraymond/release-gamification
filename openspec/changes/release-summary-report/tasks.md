# Tasks

1.  **Domain Layer:**
    *   Create a `WeeklyReleaseSummary` domain entity to represent the aggregated report.
    *   Define necessary interfaces for data retrieval if not already present (e.g., `IDeveloperScoreRepository` with appropriate queries).
2.  **Use Cases:**
    *   Implement `GenerateWeeklyReleaseSummaryUseCase` that aggregates data from `IMobileReleaseRepository`, `IReleaseItemRepository`, and `IDeveloperScoreRepository` for the past 7 days.
    *   Implement unit tests for `GenerateWeeklyReleaseSummaryUseCase`.
3.  **Infrastructure Layer:**
    *   Update `MongoMobileReleaseRepository` and `MongoDeveloperScoreRepository` (if necessary) to support querying for the past 7 days. Ensure MongoDB projections are used.
    *   Implement integration tests for repository updates.
4.  **API Layer:**
    *   Add a new Fastify route `GET /summary/weekly`.
    *   Implement integration tests for the new API endpoint.
