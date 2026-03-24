## Context

The "release-gamification" project actively tracks developer contributions (`ReleaseItem`s like PRs and Issues) towards weekly mobile releases (`MobileRelease`s). The application is a Fastify API backed by MongoDB, built with Clean Architecture in a pnpm monorepo. It currently tracks a `DeveloperScore` based on these items. The project release cadence is strictly weekly. As part of enhancing developer engagement, we are introducing a feature to broadcast the weekly developer leaderboard to a Slack channel.

## Goals / Non-Goals

**Goals:**
- Implement a robust interface (`ISlackNotificationService`) in the domain layer to decouple the business logic from the specific Slack integration.
- Implement the Slack service using `@slack/web-api` or a simple incoming webhook in the infrastructure layer.
- Create a `BroadcastWeeklyLeaderboard` use case that triggers the leaderboard generation and formats it for Slack.
- Expose a `POST /admin/broadcast-leaderboard` endpoint to allow external schedulers (e.g., GitHub Actions, cron) to trigger the weekly broadcast.

**Non-Goals:**
- Real-time Slack notifications for every PR or issue merged (we want a weekly summary).
- Complex interactive Slack messages (simple text/markdown is sufficient).
- Replacing the existing `automated-github-feedback` system.

## Decisions

- **Slack Integration Method**: We will use a simple Slack Incoming Webhook url configured via environment variables (`SLACK_WEBHOOK_URL`). This avoids the complexity of full OAuth apps and the `@slack/web-api` dependency if we only need to broadcast a message.
- **Triggering Mechanism**: Instead of embedding `node-cron` or complex scheduling inside the Fastify application, we will expose a protected `POST /admin/broadcast-leaderboard` endpoint. This adheres to the architectural constraint of keeping the app simple and stateless, allowing external systems (like a simple cron job on the host or a GitHub Action) to trigger the weekly broadcast.
- **Dependency Inversion**: The Slack integration will be abstracted behind an `ISlackNotificationService` in the `packages/domain` module, ensuring the `packages/use-cases` module remains unaware of HTTP/Slack specifics.

## Risks / Trade-offs

- **Risk**: Slack webhook URL could be misconfigured or revoked.
  **Mitigation**: The `SlackNotificationService` implementation should handle HTTP errors gracefully and log them using Fastify's logger without crashing the application.
- **Risk**: The Fastify API endpoint for triggering the broadcast needs to be secure.
  **Mitigation**: The endpoint should require an admin token/secret passed via headers (e.g., `x-admin-token`), similar to the GitHub webhook secret validation.
