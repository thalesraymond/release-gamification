## ADDED Requirements

### Requirement: Generate Notifications from Events

The system MUST listen to internal domain events related to developer activities (e.g., scoring, achievements) and generate a new `DeveloperNotification` entity.

#### Scenario: Points Awarded Event Received

- **WHEN** a `DeveloperScoreAwarded` event is emitted within the application
- **THEN** the system generates a new unread `DeveloperNotification` for the target developer with details about the points awarded and saves it to the `DeveloperNotificationRepository`.

### Requirement: Retrieve Developer Notifications API

The Fastify API MUST expose a `GET /developers/:username/notifications` endpoint that retrieves a list of notifications for the specified developer.

#### Scenario: Developer Fetches Notifications

- **WHEN** a client issues a `GET` request to `/developers/:username/notifications`
- **THEN** the API returns a 200 OK with a JSON array containing the developer's notifications, ordered by most recent first.
