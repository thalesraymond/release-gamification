## Context

The current release gamification system needs a way to automatically ingest release (milestone) and item (Pull Request) data directly from GitHub repositories. Teams manage their releases via GitHub Milestones and associate PRs with these milestones. By providing webhooks, GitHub Actions can automatically send this data to our calendar system, reducing manual entry and ensuring the calendar stays up-to-date with GitHub activity.

## Goals / Non-Goals

**Goals:**
- Provide a webhook endpoint to create a release in our calendar when a milestone is created in GitHub.
- Provide webhook endpoints to handle PR creation, editing, and removal events, associating them with the corresponding release in our calendar.
- Extract required data fields (version, platform, deadline, milestone number, PR title, PR URL, owner, repo) from incoming webhook payloads.

**Non-Goals:**
- Handling generic GitHub webhook events outside of milestone creation and PR activity.
- Automatically creating GitHub Actions workflows in user repositories (this will be done by the clients, we only provide the API).

## Decisions

- **Dedicated Webhook Endpoints:** We will create specific API endpoints designed to be consumed by GitHub Actions, e.g., `POST /webhooks/github/milestone` and `POST /webhooks/github/pr`.
- **Data Mapping:**
  - A GitHub Milestone corresponds to a `Release` in our system.
  - A GitHub PR associated with a Milestone corresponds to a `Release Item` in our system.
- **Identifiers:** We will use the combination of `owner`, `repo`, and `milestone number` to uniquely identify and link releases across GitHub and our calendar. PRs will be tracked using their `pr number` and `url`.
- **Platform Handling:** The milestone webhook payload needs to include the platform (Android or iOS). Since GitHub milestones don't have native custom fields, this might need to be parsed from the milestone title or description, or explicitly passed by the GitHub Action workflow calling the webhook.

## Risks / Trade-offs

- **Risk:** Malformed webhook payloads or missing data.
  - **Mitigation:** Implement strict validation on the incoming requests to ensure all required fields are present and return meaningful 400 Bad Request errors.
- **Risk:** Security of webhook endpoints.
  - **Mitigation:** In the future, we should implement a mechanism to verify the webhook payload signature using a secret (standard GitHub webhook security practice), but for now, we will assume the caller provides valid data.
- **Trade-off:** Relying on the client's GitHub Action to extract and format the data.
  - **Rationale:** This simplifies our API and offloads the GitHub API interaction to the client side, where they have direct access to the GitHub context within their workflow.