## ADDED Requirements

### Requirement: Post Feedback Comment on GitHub Issue or PR

The system SHALL post a feedback comment to the corresponding GitHub Issue or Pull Request when the item is successfully tracked for a MobileRelease. The comment MUST inform the author that their contribution has been tracked for the specific release version and platform.

#### Scenario: Successfully tracking a new ReleaseItem

- **WHEN** a valid GitHub webhook payload with a milestone is successfully processed and the corresponding `ReleaseItem` is upserted
- **THEN** the system calls the `IGithubCommentService` to post a comment to the issue or PR with the text "🎉 Great work! This contribution has been tracked for the release **{version} {platform}**."

#### Scenario: API failure when posting comment

- **WHEN** the GitHub API fails to post the comment (e.g., due to rate limits or missing token)
- **THEN** the system logs the error and MUST NOT fail the overarching webhook processing transaction, ensuring the `ReleaseItem` remains successfully tracked.
