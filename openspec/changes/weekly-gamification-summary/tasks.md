## 1. Domain & Infrastructure Setup

- [ ] 1.1 Add `findByDateRange(startDate: Date, endDate: Date): Promise<MobileRelease[]>` to `IMobileReleaseRepository`.
- [ ] 1.2 Implement `findByDateRange` in the MongoDB repository (`packages/infrastructure/src/MobileReleaseRepository.ts`), utilizing projections for performance optimization.

## 2. Use Cases Implementation

- [ ] 2.1 Create `GenerateWeeklySummary` use case in `packages/use-cases/src/GenerateWeeklySummary.ts`.
- [ ] 2.2 Implement logic to aggregate `DeveloperScore` data and `MobileRelease` details within the provided date range.

## 3. Fastify API Integration

- [ ] 3.1 Create `routes/gamification.ts` (if not already existing) in `apps/apis/src/routes/gamification.ts`.
- [ ] 3.2 Implement `GET /gamification/weekly-summary` route with query parameters for `startDate` and `endDate`.
- [ ] 3.3 Register the new route in `apps/apis/src/app.ts`.

## 4. Tests and Verification

- [ ] 4.1 Write unit tests for the `GenerateWeeklySummary` use case in `packages/use-cases/src/__tests__`.
- [ ] 4.2 Write API route tests for `GET /gamification/weekly-summary` in `apps/apis/src/__tests__/gamification.test.ts`.
- [ ] 4.3 Ensure all tests pass with `pnpm test`.
