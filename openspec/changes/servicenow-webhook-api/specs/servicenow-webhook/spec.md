## ADDED Requirements

### Requirement: Process ServiceNow Webhooks
The system SHALL expose a `POST /webhooks/servicenow` endpoint to receive change payload events from ServiceNow.

#### Scenario: Successful ingestion
- **WHEN** a valid ServiceNow change payload is received
- **THEN** a `ReleaseItem` is created or updated in the repository with type `SERVICENOW_CHANGE`

#### Scenario: Missing Milestone
- **WHEN** a payload is received but lacks a milestone identifier
- **THEN** the request is returned as 200 OK but marked as `processed: false` with a reason.
