## ADDED Requirements

### Requirement: Generate Weekly Summary Data
The system SHALL provide an API endpoint to aggregate developer contributions and gamification scores for mobile releases completed within a specific timeframe (e.g., a week).

#### Scenario: Fetching summary with default timeframe
- **WHEN** a client requests `GET /gamification/weekly-summary` without query parameters
- **THEN** the system calculates and returns gamification points, top contributors, and related `MobileRelease`s for the past 7 days.

#### Scenario: Fetching summary for a specific date range
- **WHEN** a client requests `GET /gamification/weekly-summary?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`
- **THEN** the system calculates and returns the summary exclusively for `MobileRelease`s that fall within the provided date range.

### Requirement: Mobile Release Filtering by Date
The domain layer MUST support querying mobile releases that occurred between a start date and an end date.

#### Scenario: Querying releases by date range
- **WHEN** the `GenerateWeeklySummary` use case needs to fetch releases for the week
- **THEN** it utilizes the `IMobileReleaseRepository` to retrieve all releases with a `releaseDate` falling between the specified start and end dates.
