## MODIFIED Requirements

### Requirement: Score Calculation

The system MUST calculate a developer's score by awarding points for their associated `ReleaseItem`s. Different item types award different points: `ISSUE` (10 points), `PULL_REQUEST` (20 points), and `PULL_REQUEST_REVIEW` (5 points).

#### Scenario: Awarding Points

- **WHEN** calculating scores for a developer
- **THEN** the system awards 10 points for each `ISSUE`, 20 points for each `PULL_REQUEST`, and 5 points for each `PULL_REQUEST_REVIEW` they are associated with.
