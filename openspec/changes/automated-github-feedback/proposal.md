## Why

With the upcoming `developer-leaderboard` feature, developers need visibility into how their work contributes to their score. Currently, tracking happens silently via webhooks without any direct feedback. By automatically commenting on GitHub PRs and Issues when they are successfully associated with a `MobileRelease`, we provide an immediate feedback loop. This increases engagement, reinforces the gamification system, and makes the tracking process transparent.

## What Changes

- Create an `IGithubCommentService` interface in the domain layer to define the contract for posting comments.
- Implement the `GithubCommentService` in the infrastructure layer using `@octokit/rest` to interact with the GitHub API.
- Update the `ProcessGithubWebhookItemUseCase` to invoke this service upon successful processing of a valid PR or Issue, notifying the author that their contribution is being tracked for the release.

## Capabilities

### New Capabilities

- `automated-github-feedback`: Adds the ability to post comments back to GitHub Issues and Pull Requests to notify authors that their item has been successfully tracked for a release.

### Modified Capabilities

- `github-webhook`: The existing webhook processing logic will be modified to include a side-effect of posting a comment to GitHub upon successful tracking.

## Impact

- **Domain:** New `IGithubCommentService` interface.
- **Infrastructure:** New `GithubCommentService` implementation using `@octokit/rest` which will require a GitHub token.
- **Use Cases:** Modified `ProcessGithubWebhookItemUseCase` to depend on `IGithubCommentService` and call it after upserting a `ReleaseItem`.
