## ADDED Requirements

### Requirement: Delete Release Calendar

The system SHALL allow users to remove an existing release calendar.

#### Scenario: Successful deletion

- **WHEN** the user provides a valid existing calendar ID
- **THEN** the system SHALL delete the release calendar from the database

#### Scenario: Delete non-existent calendar

- **WHEN** the user attempts to delete a calendar using a non-existent ID
- **THEN** the system SHALL return a "not found" error or indicate no operation was performed
