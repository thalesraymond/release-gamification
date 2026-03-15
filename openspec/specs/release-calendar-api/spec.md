# release-calendar-api Specification

## Purpose

TBD - created by archiving change add-fastify-api. Update Purpose after archive.

## Requirements

### Requirement: Register Release Calendar Endpoint

The API SHALL expose a `POST /release-calendars` endpoint to trigger the `CreateReleaseCalendar` use case.

#### Scenario: Successful registration via API

- **WHEN** a client sends a POST request to `/release-calendars` with a unique `name` "Release 2026"
- **THEN** the system SHALL create the release calendar and return a 201 Created status with the calendar details

#### Scenario: Duplicate name error via API

- **WHEN** a client sends a POST request with a name that already exists
- **THEN** the system SHALL return a 409 Conflict status with an appropriate error message

#### Scenario: Invalid input via API

- **WHEN** a client sends a POST request with a missing or invalid `name`
- **THEN** the system SHALL return a 400 Bad Request status with validation details

### Requirement: List Release Calendars Endpoint

The API SHALL expose a `GET /release-calendars` endpoint to retrieve all release calendars.

#### Scenario: Successful listing via API

- **WHEN** a client sends a GET request to `/release-calendars`
- **THEN** the system SHALL return a 200 OK status with a list of all calendars

### Requirement: Get Release Calendar by ID Endpoint

The API SHALL expose a `GET /release-calendars/:id` endpoint to retrieve a specific calendar.

#### Scenario: Successful retrieval via API

- **WHEN** a client sends a GET request to `/release-calendars/:id` with a valid existing ID
- **THEN** the system SHALL return a 200 OK status with the calendar details

#### Scenario: Calendar not found via API

- **WHEN** a client sends a GET request with a non-existent ID
- **THEN** the system SHALL return a 404 Not Found status

### Requirement: Update Release Calendar Endpoint

The API SHALL expose a `PUT /release-calendars/:id` endpoint to update an existing calendar.

#### Scenario: Successful update via API

- **WHEN** a client sends a PUT request to `/release-calendars/:id` with a valid ID and unique new name
- **THEN** the system SHALL return a 200 OK status with the updated calendar details

### Requirement: Delete Release Calendar Endpoint

The API SHALL expose a `DELETE /release-calendars/:id` endpoint to remove a calendar.

#### Scenario: Successful deletion via API

- **WHEN** a client sends a DELETE request to `/release-calendars/:id` with a valid existing ID
- **THEN** the system SHALL return a 204 No Content status
