/opsx.propose Title: Developer Notification Feed
Motivation: The system actively tracks ReleaseItems and awards DeveloperScores, storing this data in MongoDB. However, there is no direct mechanism for developers to be notified when they earn points, receive an achievement, or when their PR is included in a MobileRelease. Building a notification feed is the logical next step to increase engagement, utilizing the existing event cycle and Node EventEmitters as observed in the Architect journal.
Specification:

- Introduce a DeveloperNotification domain entity and IDeveloperNotificationRepository.
- Subscribe to internal application events (e.g., ScoreAwarded, AchievementEarned) using Node.js EventEmitter.
- Create an internal event listener that generates DeveloperNotification entities upon receiving these events.
- Expose a `GET /developers/:username/notifications` API endpoint in Fastify to allow the frontend to fetch the user's recent notifications.
