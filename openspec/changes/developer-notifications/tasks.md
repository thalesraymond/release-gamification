## 1. Domain Implementation

- [ ] 1.1 Create `DeveloperNotification` entity in `packages/domain`
- [ ] 1.2 Create `IDeveloperNotificationRepository` interface in `packages/domain`

## 2. Infrastructure Implementation

- [ ] 2.1 Create `MongoDeveloperNotificationRepository` in `packages/infrastructure`
- [ ] 2.2 Add unit tests for repository methods

## 3. Application Use Cases

- [ ] 3.1 Create `GetDeveloperNotifications` use case
- [ ] 3.2 Add Node `EventEmitter` setup in `apps/apis/src/app.ts` or as a new infrastructure service to emit events from existing score logic
- [ ] 3.3 Create a notification service listener that subscribes to internal domain events and saves them to the repository

## 4. API Endpoint

- [ ] 4.1 Add `GET /developers/:username/notifications` route in `apps/apis`
- [ ] 4.2 Register the route in `apps/apis/src/app.ts`
- [ ] 4.3 Add integration test for the new route
