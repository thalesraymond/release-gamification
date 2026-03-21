# Weekly Release Summary

The system shall generate an aggregated weekly report of gamification results and release health metrics, exposing it via a new API endpoint.

## Scenarios

### Generate Summary

Given the system has recorded `MobileRelease`s, `ReleaseItem`s, and `DeveloperScore`s for the past 7 days
When a user requests the weekly summary
Then the system returns a summary including total points awarded, top 3 developers, and the number of `ReleaseItem`s per platform
And the summary data is accurately aggregated for the past 7 days.
