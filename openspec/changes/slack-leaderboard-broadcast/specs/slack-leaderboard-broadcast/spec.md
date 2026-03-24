## ADDED Requirements

### Requirement: Broadcast Weekly Leaderboard
The system SHALL provide a mechanism to query the developer leaderboard for the past 7 days and format the top contributors into a message sent to a configured Slack channel.

#### Scenario: Successful Slack Broadcast
- **WHEN** the `BroadcastWeeklyLeaderboard` use case is executed
- **THEN** the system retrieves the top developers, formats a summary message, and sends it to Slack via the `ISlackNotificationService`

### Requirement: Trigger Broadcast via API
The system SHALL expose a protected `POST /admin/broadcast-leaderboard` endpoint that triggers the `BroadcastWeeklyLeaderboard` use case.

#### Scenario: Trigger via API with valid secret
- **WHEN** a client sends a POST request to `/admin/broadcast-leaderboard` with a valid `x-admin-token` header
- **THEN** the system triggers the broadcast and responds with a 200 OK status

#### Scenario: Trigger via API with invalid secret
- **WHEN** a client sends a POST request to `/admin/broadcast-leaderboard` without a valid `x-admin-token` header
- **THEN** the system rejects the request and responds with a 401 Unauthorized status
