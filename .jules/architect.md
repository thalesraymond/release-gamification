## 2024-05-14 - Initial Setup

**Discovery:** The development environment uses a Docker-based MongoDB instance with persistent volume storage for local development, rather than `mongodb-memory-server` which was previously used. This was done to ensure data persists across restarts. The project is a monorepo using pnpm. The `packages/infrastructure` package uses Vitest for testing. The main backend API (`apps/apis`) is built with Fastify. OpenSpec is used for architectural change proposals.
**Impact:** Future proposals should assume a Fastify + MongoDB stack with Clean Architecture. Proposals should be created using `npx @fission-ai/openspec new change "<name>"`.
**Source:** `openspec/changes/use-docker-mongodb/proposal.md`, Memory

## 2024-05-15 - Gamification Trajectory

**Discovery:** The system is transitioning from merely tracking `ReleaseItem`s (GitHub PRs/Issues) associated with `MobileRelease`s to actively gamifying contributions, as evidenced by the `developer-leaderboard` proposal. This represents a shift towards active developer engagement rather than passive tracking.
**Impact:** Future proposals should build upon this gamification trajectory by introducing feedback loops, notifications, or rewards that increase visibility of the developer leaderboard and tracked contributions.
**Source:** `openspec/changes/developer-leaderboard/proposal.md`
## 2024-05-16 - Integration Expansion

**Discovery:** The system handles tracking via a `ProcessGithubWebhookItemUseCase`, meaning the current data ingestion relies on webhooks. The `IDeliveryDetails` domain interface currently has an unused implementation, `DeliveryServiceNowChangeDetails`, suggesting plans to integrate with ServiceNow alongside GitHub.
**Impact:** To increase the gamification domain footprint and utilize existing domain entities, a logical next step is implementing a webhook integration for ServiceNow changes, mirroring the existing GitHub implementation. This provides a more comprehensive view of developer contributions across the release lifecycle.
**Source:** `apps/apis/src/routes/github-webhooks.ts`, `packages/domain/src/DeliveryServiceNowChangeDetails.ts`
