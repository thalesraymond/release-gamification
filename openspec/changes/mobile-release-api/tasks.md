## 1. Domain and Infrastructure Enhancements

- [ ] 1.1 Update `MongoMobileReleaseRepository.findAll` to accept pagination params and use `.project({ _id: 0, id: 1, version: 1, platform: 1, releaseDate: 1 })`.
- [ ] 1.2 Update `MongoMobileReleaseRepository.findById` to use `.project({ _id: 0, id: 1, version: 1, platform: 1, releaseDate: 1 })`.
- [ ] 1.3 Add `findByMilestone` method in `MongoReleaseItemRepository` with `.project(...)` to query `ReleaseItem`s for a specific release.
- [ ] 1.4 Export modified repository interfaces in `packages/domain/src/index.ts`.

## 2. Use Cases Implementation

- [ ] 2.1 Create `ListMobileReleases` use case in `packages/use-cases/src/ListMobileReleases.ts`.
- [ ] 2.2 Create `GetMobileRelease` use case in `packages/use-cases/src/GetMobileRelease.ts`.
- [ ] 2.3 Export new use cases in `packages/use-cases/src/index.ts`.

## 3. Fastify API Integration

- [ ] 3.1 Create `routes/mobile-releases.ts` in `apps/apis/src/routes/mobile-releases.ts`.
- [ ] 3.2 Implement `GET /mobile-releases` route calling `ListMobileReleases` use case.
- [ ] 3.3 Implement `GET /mobile-releases/:id` route calling `GetMobileRelease` use case and fetching associated items.
- [ ] 3.4 Register `/mobile-releases` routes in `apps/apis/src/app.ts`.

## 4. Tests and Verification

- [ ] 4.1 Write tests for updated `MongoMobileReleaseRepository` and new `MongoReleaseItemRepository` methods in `packages/infrastructure/src/__tests__`.
- [ ] 4.2 Write tests for `ListMobileReleases` and `GetMobileRelease` in `packages/use-cases/src/__tests__`.
- [ ] 4.3 Write API route tests for `GET /mobile-releases` and `GET /mobile-releases/:id` in `apps/apis/src/__tests__/mobile-releases.test.ts`.
- [ ] 4.4 Ensure all tests pass with `pnpm test`.