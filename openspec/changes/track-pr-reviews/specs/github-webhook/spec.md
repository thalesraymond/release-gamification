## MODIFIED Requirements

### Requirement: GitHub Webhook Processing
The system MUST process incoming GitHub webhooks for `pull_request`, `issues`, and `pull_request_review` events and trigger the appropriate domain logic.

#### Scenario: Valid Pull Request Webhook
- **WHEN** a valid `pull_request` webhook payload is received
- **THEN** the system parses the milestone and upserts a `ReleaseItem` of type `PULL_REQUEST`.

#### Scenario: Valid Issue Webhook
- **WHEN** a valid `issues` webhook payload is received
- **THEN** the system parses the milestone and upserts a `ReleaseItem` of type `ISSUE`.

#### Scenario: Valid Pull Request Review Webhook
- **WHEN** a valid `pull_request_review` webhook payload is received
- **THEN** the system parses the milestone from the parent pull request and upserts a `ReleaseItem` of type `PULL_REQUEST_REVIEW`.
