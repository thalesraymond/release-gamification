## 2024-05-14 - Initial Setup

**Discovery:** The development environment uses a Docker-based MongoDB instance with persistent volume storage for local development, rather than `mongodb-memory-server` which was previously used. This was done to ensure data persists across restarts. The project is a monorepo using pnpm. The `packages/infrastructure` package uses Vitest for testing. The main backend API (`apps/apis`) is built with Fastify. OpenSpec is used for architectural change proposals.
**Impact:** Future proposals should assume a Fastify + MongoDB stack with Clean Architecture. Proposals should be created using `npx @fission-ai/openspec new change "<name>"`.
**Source:** `openspec/changes/use-docker-mongodb/proposal.md`, Memory

## 2024-05-15 - Gamification Trajectory

**Discovery:** The system is transitioning from merely tracking `ReleaseItem`s (GitHub PRs/Issues) associated with `MobileRelease`s to actively gamifying contributions, as evidenced by the `developer-leaderboard` proposal. This represents a shift towards active developer engagement rather than passive tracking.
**Impact:** Future proposals should build upon this gamification trajectory by introducing feedback loops, notifications, or rewards that increase visibility of the developer leaderboard and tracked contributions.
**Source:** `openspec/changes/developer-leaderboard/proposal.md`

## 2024-05-16 - Internal Event Bus

**Discovery:** Internal service decoupling must use Node's `EventEmitter` instead of an external message broker like Redis or RabbitMQ due to single-node local Docker development environment constraints.
**Impact:** Future architectural proposals requiring async background processing or pub/sub mechanisms must strictly rely on in-process `EventEmitter` solutions to adhere to existing environmental constraints.
**Source:** Memory, `.jules/architect.md` rules
