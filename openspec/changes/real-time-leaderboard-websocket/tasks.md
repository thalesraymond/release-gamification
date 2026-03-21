## 1. Setup

- [ ] 1.1 Add `@fastify/websocket` to `apps/apis/package.json`

## 2. Core Implementation

- [ ] 2.1 Set up an `EventEmitter` singleton in `apps/apis` (e.g. `src/events.ts`)
- [ ] 2.2 Register `@fastify/websocket` plugin in `apps/apis/src/app.ts`
- [ ] 2.3 Create `/ws/leaderboard` route in `apps/apis/src/routes/leaderboard-stream.ts` that listens to `EventEmitter` events and broadcasts
- [ ] 2.4 Update `ProcessGithubWebhookItemUseCase` or webhook handler to emit `score_updated` event upon processing

## 3. Testing and Verification

- [ ] 3.1 Write unit/integration tests for the WebSocket endpoint
- [ ] 3.2 Ensure `pnpm test` passes across the workspace
