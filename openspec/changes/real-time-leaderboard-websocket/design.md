## Context

The system tracks developer contributions to releases via the `ReleaseItem` entity, which represents GitHub issues and pull requests. A `developer-leaderboard` spec defines how points are assigned to a new `DeveloperScore` entity when developers make contributions to `MobileRelease`s. Currently, this leaderboard can only be fetched via a static REST endpoint (`GET /leaderboard`). To implement true gamification, developers should see their scores update in real-time when they or their peers complete tasks.

## Goals / Non-Goals

**Goals:**
- Provide a real-time stream of developer score updates via WebSockets.
- Implement an application-wide event bus (using Node.js `EventEmitter`) to decouple the webhook processing layer from the WebSocket streaming layer.
- Ensure the WebSocket server can scale for local development and minor deployments (single instance).

**Non-Goals:**
- Handling distributed pub/sub (e.g., Redis Streams) for horizontal scaling across multiple Fastify instances (out of scope for current local Docker setup).
- Implementing complete historical replay of events upon WebSocket connection; clients will fetch initial state via REST and then listen to the stream.

## Decisions

1. **WebSocket Plugin**: Use `@fastify/websocket` to expose a `/leaderboard-stream` endpoint. It integrates natively with Fastify and requires minimal configuration.
2. **Event Bus Mechanism**: Use Node's built-in `EventEmitter` class (from the `events` module) configured as a singleton in the `apps/apis` scope.
   - *Alternative Considered*: RabbitMQ or Redis Pub/Sub. *Rejected* because the current architecture only uses MongoDB locally (see Architect Journal), and adding a new infrastructure requirement for a simple single-instance app is overkill at this stage.
3. **Payload Structure**: The WebSocket stream will broadcast JSON payloads when a score changes. Example: `{ event: 'score_updated', data: { author: 'jdoe', newScore: 150 } }`.
4. **Decoupling**: The `ProcessGithubWebhookItemUseCase` will dispatch a generic domain event (e.g., `ReleaseItemProcessed`). A separate listener inside the API layer will listen to this, optionally trigger the `CalculateDeveloperScores` logic (or if it's already updated, just read the new score), and emit the WebSocket payload.

## Risks / Trade-offs

- **[Risk] WebSocket connections dropping silently**: WebSockets can timeout or drop without the client noticing immediately.
  - **Mitigation**: Implement a basic ping/pong mechanism if necessary, though for a simple leaderboard stream, standard client-side reconnection logic is sufficient.
- **[Risk] State mismatch between REST and Stream**: A client connects, fetches the leaderboard, but misses an event that fired exactly during the fetch.
  - **Mitigation**: Keep it simple for now; clients can handle this edge case gracefully by occasionally polling or accepting the slight delay.
