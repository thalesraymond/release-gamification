## 1. Setup and Infrastructure

- [ ] 1.1 Install `mongodb`, `dotenv`, and `mongodb-memory-server` (as devDependency) in `packages/infrastructure`.
- [ ] 1.2 Create `.env.example` with `MONGODB_URI` and `DB_NAME`.
- [ ] 1.3 Implement MongoDB connection manager in `packages/infrastructure/src/database.ts` with support for `mongodb-memory-server`.
- [ ] 1.4 Setup `packages/use-cases` and `packages/infrastructure` with `vitest.config.ts`, `tsconfig.test.json`, and `package.json` scripts mirroring `packages/domain`.

## 2. Domain Layer

- [ ] 2.1 Define `IBaseRepository` interface in `packages/domain/src/IBaseRepository.ts`.
- [ ] 2.2 Define `IReleaseCalendarRepository` in `packages/domain/src/IReleaseCalendarRepository.ts` extending `IBaseRepository`.

## 3. Infrastructure Layer

- [ ] 3.1 Implement `BaseMongoRepository` in `packages/infrastructure/src/BaseMongoRepository.ts`.
- [ ] 3.2 Implement `MongoReleaseCalendarRepository` in `packages/infrastructure/src/MongoReleaseCalendarRepository.ts` extending `BaseMongoRepository`.
- [ ] 3.3 Add a mapper to convert between `ReleaseCalendar` entity and MongoDB document.

## 4. Use Case Layer

- [ ] 4.1 Define `BaseUseCase` in `packages/use-cases/src/BaseUseCase.ts`.
- [ ] 4.2 Implement `CreateReleaseCalendar` in `packages/use-cases/src/CreateReleaseCalendar.ts` extending `BaseUseCase`.
- [ ] 4.3 Add unit tests for `CreateReleaseCalendar` with mocked repository, ensuring 90%+ coverage.

## 5. Integration and Verification

- [ ] 5.1 Create an integration test to verify the use case and repository using `mongodb-memory-server`.
- [ ] 5.2 Verify that registration with a duplicate name returns an error as per spec.
- [ ] 5.3 Run `test:coverage` across all packages to verify 90%+ total coverage.
