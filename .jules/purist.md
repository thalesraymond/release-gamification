## 2024-05-18 - Extracting Hardcoded Infrastructure from Application Layer

**Violation:** Use cases (`CreateReleaseCalendar` and `ProcessGithubWebhookItem`) were hardcoding `crypto.randomUUID()` directly instead of relying on abstractions, directly coupling the application layer to the infrastructure/Node module `crypto` which violates Dependency Inversion and makes testing difficult.
**Learning:** The project relies on generated UUIDs for Domain entities creation within Use Cases, but did not have an abstract interface for this responsibility.
**Resolution:** Created an `IIdGenerator` interface in the Domain layer and injected it into the use cases, adapting them to rely on Dependency Injection so they could be mocked in tests and fully isolated from infrastructure implementations.
