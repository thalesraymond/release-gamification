## 2024-05-17 - ID Generation in Use Cases
**Violation:** Use cases are calling `crypto.randomUUID()` directly to generate IDs.
**Learning:** This is tightly coupling the use case to the Node.js `crypto` module and making it difficult to generate IDs in a domain-agnostic or testable way.
**Resolution:** Introduce an `IIdGenerator` interface in the domain layer and inject it into use cases.
