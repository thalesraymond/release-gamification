## ADDED Requirements

### Requirement: Receive and Validate ServiceNow Webhook Payload

The system SHALL expose an endpoint to receive POST requests from ServiceNow webhooks and validate that the payload contains required change details (Change Number, Short Description, Description) and a target Release Version.

#### Scenario: Valid ServiceNow Change event

- **WHEN** the webhook receives a valid payload containing the target release version and change details
- **THEN** it accepts the event for processing

#### Scenario: Invalid event type or payload

- **WHEN** the webhook receives a payload missing the required fields (like change number or target release version)
- **THEN** it ignores the event to prevent unnecessary processing

### Requirement: Register ServiceNow Changes Idempotently

The system SHALL save valid ServiceNow Change payload data as `ReleaseItem`s in the database, uniquely identified by the Change Number, using an upsert operation to prevent duplicates. It uses the `DeliveryServiceNowChangeDetails` to persist the change details within the `ReleaseItem`.

#### Scenario: New Item received

- **WHEN** a ServiceNow Change payload with a valid release version is received for the first time
- **THEN** a new `ReleaseItem` with `servicenow_change` delivery details is inserted into the database

#### Scenario: Existing Item updated

- **WHEN** a ServiceNow Change payload is received that matches an existing `ReleaseItem` (by change number)
- **THEN** the existing database record is updated rather than creating a duplicate
