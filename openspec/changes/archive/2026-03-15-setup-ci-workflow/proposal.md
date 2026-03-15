## Why

As the codebase grows, we need an automated way to ensure that changes do not break the project. Setting up a Continuous Integration (CI) workflow will provide immediate feedback on the health of the project for every commit, ensuring that only building and passing code is merged into the main branch.

## What Changes

- Create a GitHub Actions workflow to automate the CI process.
- Configure triggers for pushes to the `main` branch and pull requests.
- Implement automated building, linting, and testing using the root package scripts.

## Capabilities

### New Capabilities

- `continuous-integration`: Automated validation of codebase integrity on every push and pull request to the main branch.

### Modified Capabilities

- None.

## Impact

- **Automation**: CI will run on GitHub's infrastructure.
- **Workflow**: Developers will get feedback directly on their PRs.
- **Project Configuration**: No changes to existing code, only addition of `.github/workflows/ci.yml`.
