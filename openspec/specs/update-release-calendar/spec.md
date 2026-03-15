## ADDED Requirements

### Requirement: Update Release Calendar

The system SHALL allow users to update the properties of an existing release calendar.

#### Scenario: Successful name update

- **WHEN** the user provides an existing calendar ID and a new unique name "Updated Release 2026"
- **THEN** the system SHALL update the calendar name and return the updated details

#### Scenario: Duplicate name on update

- **WHEN** the user attempts to update a calendar name to one that is already used by another calendar
- **THEN** the system SHALL return an error indicating the name is already in use
