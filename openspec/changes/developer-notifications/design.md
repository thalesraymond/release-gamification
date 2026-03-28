## Context

The application tracks `ReleaseItem`s and awards points (`DeveloperScore`) to developers. However, currently, the developers do not have a feedback loop to know when these points are awarded or achievements are unlocked. To build upon the gamification trajectory and improve developer engagement, an internal notification system will notify developers when milestones are reached. Following the architecture constraint observed in `.jules/architect.md`, we will use Node.js `EventEmitter` to decoupled internal services instead of an external message broker like Redis.

## Goals / Non-Goals

**Goals:**

- Provide a scalable notification entity to represent different types of developer events.
- Implement an event-driven mechanism using `EventEmitter` that listens for existing internal domain events.
- Create an API endpoint (`GET /developers/:username/notifications`) to retrieve unread/read notifications.

**Non-Goals:**

- Real-time Push notifications (e.g., WebSockets, Push API, APNs) are out of scope. The project strictly follows a weekly event cycle, so polling or periodic viewing by developers is sufficient.
- Complex third-party notification delivery channels like Email or Slack are out of scope for this iteration.

## Decisions

1. **Use Node.js EventEmitter for decoupled communication**:
   - **Rationale**: The backend is built on a single-node Fastify application. Using `EventEmitter` allows the gamification logic (e.g., scoring) to emit generic events without knowing about the notification service. This adheres to Clean Architecture.
   - **Alternative Considered**: Redis Pub/Sub. Rejected because it introduces unnecessary external dependencies and violates the architectural constraint.

2. **MongoDB Storage**:
   - **Rationale**: Notifications will be stored as `DeveloperNotification` entities using a new `MongoDeveloperNotificationRepository`. This allows persisting the read/unread state and supporting pagination later.

## Risks / Trade-offs

- **Risk**: Memory leaks if event listeners are not properly managed or cleaned up.
  - **Mitigation**: Ensure that listeners are registered once during application startup in `app.ts` and not duplicated per request.
- **Risk**: Eventual consistency issues where an event fires but the notification fails to save.
  - **Mitigation**: Add structured logging to capture saving errors. The notification is non-critical, so failing to save won't break the primary use case.
