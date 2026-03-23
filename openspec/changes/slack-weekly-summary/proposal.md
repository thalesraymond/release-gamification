## Why

The system currently generates a Weekly Release Summary Report via the API (`GET /summary/weekly`), but developers and stakeholders have to proactively pull this information. To truly close the feedback loop on our weekly gamification cycle and increase visibility, we need to push this summary to where the team already communicates. Integrating with Slack to automatically post the weekly summary is the logical next step to maximize the impact of the existing `weekly-release-summary` feature.

## What Changes

- Create an `ISlackNotificationService` interface in the domain layer.
- Implement `SlackNotificationService` in the infrastructure layer to send messages via a Slack Webhook URL.
- Create a `BroadcastWeeklySummaryUseCase` that orchestrates fetching the summary (via `GenerateWeeklyReleaseSummaryUseCase` or similar logic) and sending it via the Slack service.
- Setup a cron job or scheduled task within the Fastify app (using a library like `node-cron` or Fastify's built-in scheduling if available) to trigger the broadcast weekly.

## Capabilities

### New Capabilities
- `slack-weekly-summary`: Automatically broadcasts the weekly release summary to a configured Slack channel.

### Modified Capabilities

## Impact

- **Domain:** New `ISlackNotificationService` interface.
- **Infrastructure:** New `SlackNotificationService` implementation requiring a `SLACK_WEBHOOK_URL` environment variable.
- **Use Cases:** New `BroadcastWeeklySummaryUseCase`.
- **API/App:** Addition of a scheduled task to trigger the broadcast.
