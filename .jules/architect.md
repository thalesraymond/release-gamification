## 2024-05-14 - Initial Setup
**Discovery:** The development environment uses a Docker-based MongoDB instance with persistent volume storage for local development, rather than `mongodb-memory-server` which was previously used. This was done to ensure data persists across restarts. The project is a monorepo using pnpm. The `packages/infrastructure` package uses Vitest for testing. The main backend API (`apps/apis`) is built with Fastify. OpenSpec is used for architectural change proposals.
**Impact:** Future proposals should assume a Fastify + MongoDB stack with Clean Architecture. Proposals should be created using `npx @fission-ai/openspec new change "<name>"`.
**Source:** `openspec/changes/use-docker-mongodb/proposal.md`, Memory
## 2026-03-20 - Rejected Real-Time Gamification for Weekly Summary
**Discovery:** The release cadence is strictly weekly, meaning real-time gamification updates (e.g., via WebSockets) are unnecessary and misaligned with the primary event cycle. A previous proposal for real-time WebSockets was rejected on this basis.
**Impact:** Future proposals should focus on aggregating and summarizing data on a weekly basis rather than implementing real-time, event-driven streaming features.
**Source:** User feedback rejecting the `real-time-leaderboard-websocket` proposal.
