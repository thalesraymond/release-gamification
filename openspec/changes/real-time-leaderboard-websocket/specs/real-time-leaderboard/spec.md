## ADDED Requirements

### Requirement: WebSocket Connection
The system SHALL expose a `/leaderboard-stream` WebSocket endpoint for real-time leaderboard updates.

#### Scenario: Client connects successfully
- **WHEN** a client establishes a WebSocket connection to `/leaderboard-stream`
- **THEN** the connection remains open and waits for event broadcasts

### Requirement: Leaderboard Update Broadcasting
The system MUST emit real-time score updates to connected WebSocket clients whenever a developer's score changes.

#### Scenario: Score changes and is broadcasted
- **WHEN** a GitHub webhook payload is successfully processed and points are awarded to a developer
- **THEN** an event containing the updated score information is broadcasted to all connected clients on `/leaderboard-stream`
