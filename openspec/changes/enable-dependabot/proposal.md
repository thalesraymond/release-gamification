## Why

As the project grows, manual tracking of dependency updates and security patches becomes error-prone and time-consuming. Enabling Dependabot will automate this process, ensuring the project remains secure and up-to-date with minimal manual effort.

## What Changes

- Add a Dependabot configuration file (`.github/dependabot.yml`).
- Configure automated updates for the `npm` (pnpm) ecosystem and GitHub Actions.

## Capabilities

### New Capabilities

- `dependency-updates`: Automated monitoring and pull requests for dependency and action updates.

### Modified Capabilities

- None.

## Impact

- **GitHub Repository**: New automated pull requests will be created for dependency updates.
- **Workflow**: Developers will need to review and merge Dependabot PRs periodically.
- **Project Structure**: Addition of `.github/dependabot.yml`.
