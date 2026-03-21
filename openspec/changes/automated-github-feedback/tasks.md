## 1. Domain Updates

- [ ] 1.1 Create `IGithubCommentService` interface in `packages/domain/src/IGithubCommentService.ts`
- [ ] 1.2 Export `IGithubCommentService` from `packages/domain/src/index.ts`

## 2. Infrastructure Updates

- [ ] 2.1 Install `@octokit/rest` dependency in `packages/infrastructure` if not already present
- [ ] 2.2 Implement `GithubCommentService` in `packages/infrastructure/src/GithubCommentService.ts`
- [ ] 2.3 Export `GithubCommentService` from `packages/infrastructure/src/index.ts`

## 3. Use Case Updates

- [ ] 3.1 Update `ProcessGithubWebhookItemUseCase` constructor to accept `IGithubCommentService`
- [ ] 3.2 Update `ProcessGithubWebhookItemUseCase.execute` to call the comment service after successfully upserting a `ReleaseItem`
- [ ] 3.3 Ensure the comment API call in the use case is wrapped in a try-catch block to prevent webhook transaction failure

## 4. API Route Updates

- [ ] 4.1 Update Fastify plugin in `apps/apis/src/routes/github-webhooks.ts` to inject the new `GithubCommentService` into the use case

## 5. Testing

- [ ] 5.1 Write tests for `GithubCommentService` in `packages/infrastructure/src/__tests__`
- [ ] 5.2 Update/add tests for `ProcessGithubWebhookItemUseCase` to verify comment posting behavior and error handling
