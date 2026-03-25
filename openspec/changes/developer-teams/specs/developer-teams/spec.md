## ADDED Requirements

### Requirement: Developers Can Join Teams
The system MUST allow developers to join a specific team, associating their future and past gamification scores with that team's aggregate score.

#### Scenario: Developer joins an existing team
- **WHEN** a developer initiates a request to join an existing team.
- **THEN** the system MUST associate the developer's username with the team's ID.

### Requirement: Aggregate Team Scores
The system MUST calculate a team's total score by summing the individual `DeveloperScore`s of all its associated members.

#### Scenario: Calculate total team score
- **WHEN** the system calculates the team leaderboard.
- **THEN** the score for a specific team MUST be the sum of all points awarded to developers who are members of that team.

### Requirement: Retrieve Team Leaderboard
The system MUST expose an API endpoint that returns a ranked list of teams based on their aggregated scores.

#### Scenario: Successful team leaderboard retrieval
- **WHEN** a GET request is made to `/teams/leaderboard`.
- **THEN** the system MUST return a 200 OK status and a list of teams ranked by their total score in descending order.
