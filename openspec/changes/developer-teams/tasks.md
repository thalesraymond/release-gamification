## 1. Domain Layer Updates

- [ ] 1.1 Create `DeveloperTeam` domain entity and DTOs in `packages/domain`.
- [ ] 1.2 Define `IDeveloperTeamRepository` interface in `packages/domain`.

## 2. Infrastructure Layer Updates

- [ ] 2.1 Implement `MongoDeveloperTeamRepository` in `packages/infrastructure`.
- [ ] 2.2 Add unit/integration tests for `MongoDeveloperTeamRepository` with mocked MongoDB collections.

## 3. Use Case Implementations

- [ ] 3.1 Implement `CreateDeveloperTeam` use case in `packages/use-cases`.
- [ ] 3.2 Implement `ManageTeamMembers` use case in `packages/use-cases`.
- [ ] 3.3 Implement `ListDeveloperTeams` use case in `packages/use-cases`.
- [ ] 3.4 Implement `GetTeamLeaderboard` use case (or update `GetLeaderboard`) in `packages/use-cases` to dynamically calculate aggregate scores.
- [ ] 3.5 Write unit tests for all new use cases.

## 4. API Layer (Fastify)

- [ ] 4.1 Create Zod schemas for team-related requests and responses in `apps/apis/src/schemas/`.
- [ ] 4.2 Expose `POST /teams`, `PUT /teams/:id/members`, and `GET /teams` endpoints in `apps/apis/src/routes/`.
- [ ] 4.3 Expose `GET /leaderboard/teams` endpoint.
- [ ] 4.4 Write integration tests for the new Fastify routes using `app.inject()`.
