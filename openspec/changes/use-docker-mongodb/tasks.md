## 1. Infrastructure Setup

- [ ] 1.1 Create `docker-compose.yml` in the project root to define the MongoDB service
- [ ] 1.2 Configure the MongoDB container with `mongo:7.0` image and persistent volume mapping
- [ ] 1.3 Update `.gitignore` to ignore the `.docker/` data directory

## 2. Environment Configuration

- [ ] 2.1 Update `.env.example` to include the Docker-based `MONGODB_URI`
- [ ] 2.2 Update the local `.env` with the Docker connection URI
- [ ] 2.3 Verify `docker-compose up` starts the database and exposes the port correctly

## 3. Database Connection Logic

- [ ] 3.1 Refine the `DatabaseConnection` class in `packages/infrastructure/src/database.ts` to log a clear message when using the Docker-based URI
- [ ] 3.2 Ensure `NODE_ENV=test` still defaults to `mongodb-memory-server` for clean test isolation

## 4. Documentation and Verification

- [ ] 4.1 Update the project `README.md` with instructions on how to start the local database
- [ ] 4.2 Verify data persistence by restarting the MongoDB container and checking existing records
- [ ] 4.3 Ensure the in-memory fallback still works when Docker is stopped and `MONGODB_URI` is unset
