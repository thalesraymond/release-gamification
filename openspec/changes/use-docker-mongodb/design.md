## Context

The current development environment relies on `mongodb-memory-server` when no `MONGODB_URI` is provided. While convenient for quick starts, it lacks data persistence, which is crucial for testing features that span across multiple sessions or restarts. This design introduces a standard Docker-based MongoDB setup for local development.

## Goals / Non-Goals

**Goals:**

- Provide a persistent MongoDB instance using Docker Compose.
- Ensure easy setup for new developers with a single command.
- Maintain backward compatibility with the in-memory fallback for testing or quick evaluations.
- Support data persistence across container restarts.

**Non-Goals:**

- Managing production or staging databases (handled by cloud providers).
- Implementing complex database clustering or sharding in development.

## Decisions

- **Infrastructure**: Use `docker-compose.yml` to define the MongoDB service. Rationale: Standard tool for local orchestration, easy to use and maintain.
- **Persistence**: Use a host volume mapping `./.docker/mongodb_data:/data/db`. Rationale: Simplest way to ensure data persistence while keeping the data files accessible (and git-ignored) within the project structure.
- **Connection Strategy**:
  - The API and background tasks will check for `MONGODB_URI` in `.env`.
  - The `docker-compose.yml` will expose MongoDB on a specific port (e.g., `27017`).
  - `mongodb-memory-server` remains as a fallback for `NODE_ENV=test` or when no `MONGODB_URI` is explicitly set and Docker isn't desired.
- **Version**: Use `mongo:7.0`. Rationale: Current stable version compatible with the `mongodb` driver used in the project.

## Risks / Trade-offs

- [Risk] → Increased local resource usage (Docker daemon and MongoDB container).
- [Mitigation] → Keep the container lightweight and only run it when needed.
- [Risk] → Developers might forget to start Docker, causing connection errors.
- [Mitigation] → Provide clear documentation and maintain the in-memory fallback with a descriptive warning/log message.
- [Risk] → Volume permission issues on different operating systems.
- [Mitigation] → Use standard Docker volume patterns and document common fixes for permission errors.
