## 1. Scaffolding

- [x] 1.1 Create `apps/apis` directory structure
- [x] 1.2 Initialize `apps/apis/package.json` with workspace dependencies
- [x] 1.3 Configure `apps/apis/tsconfig.json` extending root config
- [x] 1.4 Setup `apps/apis/vitest.config.ts` for integration testing

## 2. Core API Implementation

- [x] 2.1 Install Fastify and core plugins (helmet, cors, swagger, sensible)
- [x] 2.2 Setup Zod type provider for request/response validation
- [x] 2.3 Implement standard error handling and 404 responses
- [x] 2.4 Create the Fastify application factory in `src/app.ts`

## 3. Release Calendar API

- [x] 3.1 Define Zod schemas for `POST /release-calendars`
- [x] 3.2 Implement the `POST /release-calendars` route calling `CreateReleaseCalendar`
- [x] 3.3 Register the routes in the application factory

## 4. Entry Point and Deployment

- [x] 4.1 Create `src/server.ts` to instantiate and listen on a port
- [x] 4.2 Add `pnpm` scripts to run the API (dev, build, start)

## 5. Verification and Testing

- [x] 5.1 Implement integration tests for `POST /release-calendars` (success and error cases)
- [x] 5.2 Verify Swagger UI is accessible at `/docs`
- [x] 5.3 Ensure 90%+ test coverage for the new API layer
