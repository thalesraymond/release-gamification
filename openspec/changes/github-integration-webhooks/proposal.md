## Why

We need to integrate with GitHub to automatically sync release milestones and PR data into our release calendar. This allows teams to have a centralized and automated view of their releases and the items (PRs) associated with them, directly driven by GitHub Actions webhooks.

## What Changes

- Add a new webhook endpoint to handle GitHub milestone creation, which will create a release associated with the calendar.
- Add webhook endpoints to handle GitHub PR creation/editing/removal from a release milestone.
- The milestone creation API will require: `release version`, `platform` (android or ios), `deadline`, and `milestone number`.
- The PR hook API will require: `title`, `pr number`, `url`, `milestone number`, `owner`, and `repo`.
- These endpoints will be used by our clients (via GitHub Actions) to integrate their PR data into our release gamification/calendar system.

## Capabilities

### New Capabilities
- `github-webhooks`: Endpoints to receive and process GitHub webhook payloads for milestones (releases) and PRs (release items).

### Modified Capabilities
- `release-calendar-api`: May need to be modified or extended to support associating releases and release items based on the incoming GitHub webhook data.

## Impact

- New API routes/controllers for handling GitHub webhooks.
- New use cases/domain logic to process milestone and PR data and map them to our internal `Release` and `ReleaseItem` concepts.
- Potential updates to existing calendar/release data models to store GitHub-specific identifiers (like `milestone number`, `repo`, `owner`, `pr number`).
