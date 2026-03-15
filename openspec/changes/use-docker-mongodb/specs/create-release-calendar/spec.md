## MODIFIED Requirements

### Requirement: Development Database

The system SHALL support using either a persistent Docker-based MongoDB or an in-memory MongoDB server for development and testing environments.

#### Scenario: Persistent Docker database connection

- **WHEN** the application starts in development mode and a `MONGODB_URI` pointing to a Docker instance is provided
- **THEN** the system SHALL connect to the Docker-based MongoDB and ensure data persistence

#### Scenario: Automatic memory server startup as fallback

- **WHEN** the application starts in development/test mode and no `MONGODB_URI` is provided, and the Docker instance is not running
- **THEN** the system SHALL start an instance of `mongodb-memory-server` and connect to it automatically for non-persistent sessions
