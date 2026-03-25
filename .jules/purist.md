## 2024-05-24 - ID Generation Coupling
**Violation:** Use cases are tightly coupled to `crypto.randomUUID()` directly instead of using a domain abstraction.
**Learning:** This violates the Dependency Inversion Principle, tying application logic to a specific runtime/infrastructure implementation.
**Resolution:** Introduce an `IIdGenerator` interface in the domain, inject it into the Use Cases, and implement it in the infrastructure layer.
