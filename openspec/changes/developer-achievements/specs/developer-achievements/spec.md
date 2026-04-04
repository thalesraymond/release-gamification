## ADDED Requirements

### Requirement: Track Issue Labels

The system MUST persist GitHub issue labels as part of the `ReleaseItem` data when processing webhook events to support label-based gamification logic.

#### Scenario: Store Issue Labels

- **WHEN** a GitHub Issue webhook is processed by the system.
- **THEN** any associated labels MUST be extracted and stored within the resulting `ReleaseItem`'s delivery details.

### Requirement: Evaluate Developer Achievements

The system MUST evaluate predefined achievement conditions whenever a developer is awarded a score for a ReleaseItem.

#### Scenario: Award First PR Badge

- **WHEN** a developer has their first GitHub Pull Request ReleaseItem processed.
- **THEN** the system MUST award the "First PR" achievement to that developer.

#### Scenario: Award Bug Squasher Badge

- **WHEN** a developer reaches 5 tracked GitHub Issues labeled 'bug'.
- **THEN** the system MUST award the "Bug Squasher" achievement to that developer.

#### Scenario: Prevent Redundant Badge Awards

- **WHEN** a developer already holds a specific achievement (e.g., "First PR").
- **THEN** the system MUST NOT award the same achievement again upon subsequent evaluations.

### Requirement: Retrieve Developer Achievements

The system MUST expose an API endpoint allowing retrieval of all achievements earned by a specific developer username.

#### Scenario: Successful Achievement Retrieval

- **WHEN** a GET request is made to `/developers/:username/achievements` with a valid username.
- **THEN** the system MUST return a 200 OK status and a list of achievement definitions the developer has earned.
