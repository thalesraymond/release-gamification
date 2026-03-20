## ADDED Requirements

### Requirement: Receive and Validate Webhook Payload

The system SHALL expose an endpoint to receive POST requests from GitHub webhooks and validate that the payload represents an Issue or Pull Request.

#### Scenario: Valid Pull Request event

- **WHEN** the webhook receives a valid Pull Request payload
- **THEN** it accepts the event for processing

#### Scenario: Invalid event type

- **WHEN** the webhook receives an event that is neither an Issue nor a Pull Request
- **THEN** it ignores the event to prevent unnecessary processing

### Requirement: Validate Milestone Constraints

The system MUST check the milestone from the Issue/PR and ensure its title contains both a version identifier and a platform identifier before registering it as a Release Item.

#### Scenario: Milestone with valid version and platform

- **WHEN** the payload contains a milestone like "v1.2.0 iOS"
- **THEN** the milestone is considered valid

#### Scenario: Milestone missing required information

- **WHEN** the payload contains a milestone without a platform (e.g. "v1.2.0") or no milestone at all
- **THEN** the system ignores the item

### Requirement: Register Release Items Idempotently

The system SHALL save valid GitHub Issues and PRs as `ReleaseItems` in the database, uniquely identified by the repository full name and the issue/PR number, using an upsert operation to prevent duplicates.

#### Scenario: New Item received

- **WHEN** an Issue or PR with a valid milestone is received for the first time
- **THEN** a new `ReleaseItem` is inserted into the database

#### Scenario: Existing Item updated

- **WHEN** an Issue or PR payload is received that matches an existing `ReleaseItem`
- **THEN** the existing database record is updated rather than creating a duplicate
