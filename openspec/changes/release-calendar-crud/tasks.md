## 1. Domain and Infrastructure

- [ ] 1.1 Add `delete(id: string): Promise<void>` to `IBaseRepository` and `IReleaseCalendarRepository`
- [ ] 1.2 Implement `delete` in `MongoReleaseCalendarRepository`
- [ ] 1.3 Add unit tests for `delete` in the repository infrastructure

## 2. Use Cases

- [ ] 2.1 Implement `GetReleaseCalendar` use case and tests
- [ ] 2.2 Implement `ListReleaseCalendars` use case and tests
- [ ] 2.3 Implement `UpdateReleaseCalendar` use case and tests
- [ ] 2.4 Implement `DeleteReleaseCalendar` use case and tests

## 3. Fastify API

- [ ] 3.1 Define Zod schemas for GET, PUT, DELETE operations in `apps/apis/src/routes/release-calendars.ts`
- [ ] 3.2 Implement `GET /release-calendars` (List)
- [ ] 3.3 Implement `GET /release-calendars/:id` (Get)
- [ ] 3.4 Implement `PUT /release-calendars/:id` (Update)
- [ ] 3.5 Implement `DELETE /release-calendars/:id` (Delete)

## 4. Verification

- [ ] 4.1 Run full workspace build and lint
- [ ] 4.2 Execute integration tests for all CRUD operations
- [ ] 4.3 Verify API documentation (Swagger) is updated with new endpoints
