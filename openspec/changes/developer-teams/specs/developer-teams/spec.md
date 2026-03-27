## ADDED Requirements

### Requirement: Create Developer Team

The system SHALL allow users to create a new developer team with a unique name and an initial list of members.

#### Scenario: Successful creation

- **WHEN** a valid POST request is made to `/teams` with a name and an array of member usernames
- **THEN** the system SHALL create the team, persist it to the database, and return a 201 Created status with the team details.

#### Scenario: Duplicate team name

- **WHEN** a POST request is made to `/teams` with a name that already exists
- **THEN** the system SHALL reject the request and return a 409 Conflict status.

### Requirement: Manage Team Members

The system SHALL allow users to update the members of an existing team.

#### Scenario: Successful member update

- **WHEN** a valid PUT request is made to `/teams/:id/members` with an array of member usernames
- **THEN** the system SHALL update the team's member list and return a 200 OK status with the updated team details.

#### Scenario: Team not found

- **WHEN** a PUT request is made to `/teams/:id/members` for a non-existent team ID
- **THEN** the system SHALL return a 404 Not Found status.

### Requirement: List Developer Teams

The system SHALL provide a way to retrieve a list of all developer teams.

#### Scenario: Successful retrieval

- **WHEN** a GET request is made to `/teams`
- **THEN** the system SHALL return a 200 OK status with a list of all developer teams and their members.
