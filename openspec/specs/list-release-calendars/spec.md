## ADDED Requirements

### Requirement: List All Release Calendars

The system SHALL allow users to retrieve a list of all existing release calendars.

#### Scenario: Successful listing

- **WHEN** the user requests to list all release calendars
- **THEN** the system SHALL return a list containing all stored release calendars

#### Scenario: Empty list

- **WHEN** there are no release calendars in the system
- **THEN** the system SHALL return an empty list
