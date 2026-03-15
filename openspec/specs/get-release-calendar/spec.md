## ADDED Requirements

### Requirement: Retrieve Release Calendar by ID

The system SHALL allow users to retrieve a specific release calendar using its unique ID.

#### Scenario: Successful retrieval

- **WHEN** the user provides a valid existing calendar ID
- **THEN** the system SHALL return the release calendar details (ID, name, and releases)

#### Scenario: Calendar not found

- **WHEN** the user provides a non-existent calendar ID
- **THEN** the system SHALL return a "not found" error
