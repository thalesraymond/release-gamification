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
