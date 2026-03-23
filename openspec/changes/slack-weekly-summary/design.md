## Context

The `release-gamification` project has implemented a weekly gamification cycle, culminating in a Weekly Release Summary Report. This report is currently only accessible via an API pull (`GET /summary/weekly`). To maximize developer engagement, we want to push this report to Slack, where the development team already communicates. This requires integrating a scheduling mechanism and an external Slack webhook service.

## Goals / Non-Goals

**Goals:**
- Automatically fetch the Weekly Release Summary data.
- Format the data into a readable Slack message (potentially using Block Kit for better formatting).
- Send the message to a configured Slack channel on a weekly schedule.

**Non-Goals:**
- Interactive Slack bot features (e.g., slash commands to fetch the report on demand). This is strictly a push notification.
- Supporting multiple Slack workspaces or channels simultaneously (a single global webhook configuration is sufficient for now).

## Decisions

- **Scheduling:** We will use `node-cron` within the `apps/apis` Fastify application to schedule the weekly broadcast. This avoids the complexity of external cron jobs or specialized job queues (like Redis/BullMQ) in our single-node Docker setup, aligning with our architectural constraints.
- **Slack Integration:** We will use a simple HTTP POST request to a Slack Incoming Webhook URL. This is the simplest and most robust way to send messages to a specific channel without requiring a complex Slack App installation and OAuth flow.
- **Message Formatting:** We will use a basic string template for the Slack message initially, focusing on delivering the core metrics (total points, top developers, release items).

## Risks / Trade-offs

- **Risk:** The single-node scheduling using `node-cron` means if the API server is down at the scheduled time, the broadcast will be missed.
  - **Mitigation:** The scheduled time should be chosen during a period of expected high availability. For a weekly summary, missing one broadcast is not critical, and it can always be triggered manually via the API if needed.
- **Risk:** Slack Webhook URL is a sensitive credential.
  - **Mitigation:** It will be passed as an environment variable (`SLACK_WEBHOOK_URL`) and never hardcoded.
