## Why

The project is focused on "release gamification". We recently introduced the `DeveloperScore` entity and leaderboard functionality (via the `developer-leaderboard` proposal). However, the current model only allows fetching the leaderboard statically. Real gamification thrives on instant feedback. By introducing real-time updates via WebSockets, developers can instantly see their score increase when they merge a PR or close an issue associated with a valid mobile release. This creates a much more engaging and immediate feedback loop.

## What Changes

- Add `@fastify/websocket` to `apps/apis` to support WebSocket connections.
- Implement an event emitter mechanism within the Fastify application or the application's use-case layer.
- Update `ProcessGithubWebhookItemUseCase` (or the `CalculateDeveloperScores` logic) to emit an event (e.g., `score_updated`) when a developer's score changes.
- Create a new `/leaderboard-stream` WebSocket route that listens for `score_updated` events and broadcasts the updated score/leaderboard to connected clients.

## Capabilities

### New Capabilities

- `real-time-leaderboard`: Provides a WebSocket connection that pushes live updates of developer scores and the leaderboard rankings as they change in real-time.

### Modified Capabilities

- `developer-leaderboard`: Will now be supplemented with a real-time streaming capability in addition to the static REST endpoint.
- `github-webhook`: The processing of webhooks will now trigger real-time events for score updates.

## Impact

- **API:** Adds a new WebSocket endpoint (`/leaderboard-stream`). Adds `@fastify/websocket` dependency.
- **Use Cases:** The webhook processing logic will now involve emitting events for downstream consumption.
