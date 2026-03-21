## MODIFIED Requirements

### Requirement: Register Release Items Idempotently

The system SHALL save valid GitHub Issues and PRs as `ReleaseItems` in the database, uniquely identified by the repository full name and the issue/PR number, using an upsert operation to prevent duplicates. Additionally, upon successful upsert, the system SHALL trigger the automated feedback comment mechanism.

#### Scenario: New Item received

- **WHEN** an Issue or PR with a valid milestone is received for the first time
- **THEN** a new `ReleaseItem` is inserted into the database and a feedback comment is posted to GitHub.

#### Scenario: Existing Item updated

- **WHEN** an Issue or PR payload is received that matches an existing `ReleaseItem`
- **THEN** the existing database record is updated rather than creating a duplicate, and a feedback comment is posted to GitHub.
