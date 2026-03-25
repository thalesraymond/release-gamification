## 1. Domain Entities and Repositories

- [ ] 1.1 Create `Team` and `TeamMember` domain entities in `packages/domain/src`.
- [ ] 1.2 Define `ITeamRepository` and `ITeamMemberRepository` interfaces in `packages/domain/src`.

## 2. Use Cases

- [ ] 2.1 Implement `CreateTeam` use case in `packages/use-cases/src`.
- [ ] 2.2 Implement `AddTeamMember` use case in `packages/use-cases/src`.
- [ ] 2.3 Implement `GetTeamLeaderboard` use case in `packages/use-cases/src` that aggregates scores.

## 3. Infrastructure

- [ ] 3.1 Implement MongoDB repositories for `Team` and `TeamMember` in `packages/infrastructure/src`.
- [ ] 3.2 Update `DatabaseConnection` or dependency injection setup to include the new repositories.

## 4. API Endpoints

- [ ] 4.1 Add `POST /teams` and `POST /teams/:teamId/members` endpoints in `apps/apis/src/routes`.
- [ ] 4.2 Add `GET /teams/leaderboard` endpoint in `apps/apis/src/routes`.
- [ ] 4.3 Add corresponding Zod schemas for the new endpoints.

## 5. Testing

- [ ] 5.1 Write unit tests for the new use cases.
- [ ] 5.2 Write integration tests for the new API endpoints and score aggregation logic.
