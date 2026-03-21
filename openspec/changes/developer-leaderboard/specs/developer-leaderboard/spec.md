## ADDED Requirements

### Requirement: Calculate Developer Scores

The system MUST calculate and persist developer scores based on the `ReleaseItem`s associated with a `MobileRelease`. Every time a GitHub issue or PR is processed and stored as a `ReleaseItem`, the system MUST credit the author with a predefined number of points (e.g., 10 points).

#### Scenario: Author receives points for a valid ReleaseItem

- **WHEN** a webhook processes a GitHub PR or Issue and successfully creates a `ReleaseItem` associated with a valid milestone
- **THEN** the system upserts the `DeveloperScore` for the item's author, adding 10 points to their total score.

### Requirement: Retrieve Developer Leaderboard

The system MUST expose an endpoint `GET /leaderboard` that returns a list of developer scores. The list MUST be sorted in descending order based on the points, and MUST use MongoDB projections (e.g., `.project({ _id: 0 })`) in the repository retrieval methods to minimize data transfer and memory usage.

#### Scenario: Successful leaderboard retrieval

- **WHEN** a client makes a GET request to `/leaderboard`
- **THEN** the system returns a JSON array of developer score objects, sorted from highest score to lowest score.
