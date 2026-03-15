## 1. Project Setup and Data Structures

- [ ] 1.1 Update `Release` domain model to include GitHub properties (`owner`, `repo`, `milestoneNumber`, `platform`, `deadline`).
- [ ] 1.2 Update `ReleaseItem` domain model to include GitHub PR properties (`title`, `prNumber`, `url`, `milestoneNumber`, `owner`, `repo`).

## 2. Milestone Webhook Integration

- [ ] 2.1 Create use case for handling GitHub milestone creation (`HandleGitHubMilestoneWebhook`).
- [ ] 2.2 Define request DTO with fields: `releaseVersion`, `platform`, `deadline`, `milestoneNumber`.
- [ ] 2.3 Implement the use case logic to find or create a `Release` in the system.
- [ ] 2.4 Add a new fastify endpoint `POST /webhooks/github/milestone` mapped to the new use case.

## 3. PR Webhook Integration

- [ ] 3.1 Create use case for handling GitHub PR creation/update (`HandleGitHubPrWebhook`).
- [ ] 3.2 Define request DTO with fields: `title`, `prNumber`, `url`, `milestoneNumber`, `owner`, `repo`.
- [ ] 3.3 Implement the use case logic to create/update the `ReleaseItem` and associate it with the appropriate `Release`.
- [ ] 3.4 Create use case for handling GitHub PR removal/unlinking (`HandleGitHubPrRemovalWebhook`).
- [ ] 3.5 Implement logic to remove the association between the `ReleaseItem` and the `Release`.
- [ ] 3.6 Add a new fastify endpoint `POST /webhooks/github/pr` mapped to these PR use cases based on the action/payload.

## 4. Testing & Validation

- [ ] 4.1 Write unit tests for new use cases ensuring correct association and creation.
- [ ] 4.2 Write integration tests for the new `POST /webhooks/github/milestone` endpoint.
- [ ] 4.3 Write integration tests for the new `POST /webhooks/github/pr` endpoint.
