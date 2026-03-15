## ADDED Requirements

### Requirement: GitHub Milestone Webhook Endpoint

The API SHALL expose an endpoint to handle GitHub milestone creation, which will create a release associated with the calendar.

#### Scenario: Successful milestone creation

- **WHEN** a client sends a request to the milestone webhook endpoint with a valid payload containing `release version`, `platform` (android or ios), `deadline`, and `milestone number`
- **THEN** the system SHALL create a new release in the calendar with the provided details and return a success status.

#### Scenario: Missing required fields in milestone payload

- **WHEN** a client sends a request to the milestone webhook endpoint with a payload missing any of `release version`, `platform`, `deadline`, or `milestone number`
- **THEN** the system SHALL return a 400 Bad Request error indicating the missing fields.

### Requirement: GitHub PR Webhook Endpoint for Creation

The API SHALL expose an endpoint to handle GitHub PR creation/editing, linking it to the correct release milestone.

#### Scenario: Successful PR creation/editing associated with a milestone

- **WHEN** a client sends a request to the PR webhook endpoint with a valid payload containing `title`, `pr number`, `url`, `milestone number`, `owner`, and `repo`
- **THEN** the system SHALL save/edit the correct item and associate it with the release identified by the `milestone number`, `owner`, and `repo` in the calendar, returning a success status.

#### Scenario: Missing required fields in PR payload

- **WHEN** a client sends a request to the PR webhook endpoint with a payload missing any of `title`, `pr number`, `url`, `milestone number`, `owner`, or `repo`
- **THEN** the system SHALL return a 400 Bad Request error indicating the missing fields.

### Requirement: GitHub PR Webhook Endpoint for Removal

The API SHALL expose an endpoint to handle the removal of a GitHub PR from a release milestone.

#### Scenario: Successful PR removal from a milestone

- **WHEN** a client sends a request to the PR webhook endpoint indicating a PR has been removed, providing the necessary identifiers (e.g., `pr number`, `milestone number`, `repo`, `owner`)
- **THEN** the system SHALL remove the association between the corresponding item and the release in the calendar, returning a success status.
