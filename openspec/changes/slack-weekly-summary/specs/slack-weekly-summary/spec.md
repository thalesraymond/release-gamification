## ADDED Requirements

### Requirement: Slack Notification Service Interface
The system SHALL define an `ISlackNotificationService` interface in the domain layer to abstract the sending of messages to Slack.

#### Scenario: Interface defined
- **WHEN** implemented in infrastructure
- **THEN** it must accept a message payload and return a success/failure indication without exposing Slack-specific dependencies to the domain

### Requirement: Broadcast Weekly Summary Use Case
The system SHALL provide a `BroadcastWeeklySummaryUseCase` that retrieves the weekly summary data and uses the `ISlackNotificationService` to send it.

#### Scenario: Successful broadcast
- **WHEN** the use case is invoked and summary data is successfully retrieved
- **THEN** it formats the summary data into a string message
- **THEN** it calls the `ISlackNotificationService` to send the message

### Requirement: Scheduled Broadcast
The system SHALL automatically execute the `BroadcastWeeklySummaryUseCase` on a predefined weekly schedule (e.g., every Friday at 5 PM).

#### Scenario: Scheduled execution
- **WHEN** the scheduled time arrives
- **THEN** the system automatically triggers the broadcast use case
- **THEN** the summary is sent to the configured Slack channel
