## MODIFIED Requirements

### Requirement: Calculate Scores
The system SHALL assign points for `ReleaseItem`s associated with a `MobileRelease`.

#### Scenario: Awarding points for GitHub Contributions
- **WHEN** a `ReleaseItem` of type `ISSUE` or `PULL_REQUEST` is associated with a release
- **THEN** the developer receives standard gamification points.

#### Scenario: Awarding points for ServiceNow Deployments
- **WHEN** a `ReleaseItem` of type `SERVICENOW_CHANGE` is associated with a release
- **THEN** the developer associated with the change receives gamification points.
