## Context

The system tracks GitHub Issues and PRs via webhooks and stores them as `ReleaseItem`s associated with `MobileRelease`s. We are shifting toward a gamification model where developers earn points for their contributions. However, the current process is a silent background task. By introducing a mechanism that comments on the original PRs and Issues, we can provide immediate feedback and reinforcement that their work is being tracked and scored for a specific release.

## Goals / Non-Goals

**Goals:**

- Implement an `IGithubCommentService` interface in the domain to abstract the external API call.
- Implement `GithubCommentService` in the infrastructure layer using the `@octokit/rest` library to post comments to GitHub.
- Modify the `ProcessGithubWebhookItemUseCase` to use the `IGithubCommentService` to post a congratulatory message on successful tracking of an item.

**Non-Goals:**

- Displaying the actual leaderboard score in the comment (we only want to notify them that the item is tracked).
- Posting comments for items that are not successfully tracked (e.g. invalid milestones).
- A two-way sync of comments.

## Decisions

1. **Service Interface (`IGithubCommentService`)**: By creating an interface in the domain package, we maintain Clean Architecture principles, ensuring our use cases don't depend on `@octokit/rest` or specific infrastructure implementation details.
2. **Infrastructure Implementation (`GithubCommentService`)**: We will use `@octokit/rest` initialized with a `GITHUB_TOKEN` from the environment to post the comment. The service will construct the comment using the issue/PR number and the repository name.
3. **Use Case Modification**: The `ProcessGithubWebhookItemUseCase` will call the comment service only after the `ReleaseItem` has been successfully created/upserted and a `MobileRelease` is found/created. It will use a standard message template like: `"🎉 Great work! This contribution has been tracked for the release **{version} {platform}**."`.

## Risks / Trade-offs

- **Risk**: GitHub API rate limits might be exceeded if a massive number of webhooks are processed simultaneously.
  - **Mitigation**: This is a background gamification feature; occasional failures to comment are acceptable, so we can wrap the API call in a try-catch block to prevent it from failing the main webhook processing transaction.
- **Risk**: The system needs a GitHub token with `repo` or `issues` write access to the specific repositories.
  - **Mitigation**: The environment must be configured with a `GITHUB_TOKEN`. If not present, the `GithubCommentService` will log a warning instead of crashing.
