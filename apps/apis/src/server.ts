import { createApp } from "./app.js";
import { MongoReleaseCalendarRepository } from "@release-gamification/infrastructure/src/MongoReleaseCalendarRepository.js";
import { MongoReleaseItemRepository } from "@release-gamification/infrastructure/src/MongoReleaseItemRepository.js";
import { MongoMobileReleaseRepository } from "@release-gamification/infrastructure/src/MongoMobileReleaseRepository.js";
import { DatabaseConnection } from "@release-gamification/infrastructure/src/database.js";

const start = async () => {
  try {
    const releaseCalendarRepository = new MongoReleaseCalendarRepository();
    const releaseItemRepository = new MongoReleaseItemRepository();
    const mobileReleaseRepository = new MongoMobileReleaseRepository();

    const app = createApp({
      releaseCalendarRepository,
      releaseItemRepository,
      mobileReleaseRepository,
      githubWebhookSecret: process.env.GITHUB_WEBHOOK_SECRET || "development-secret",
    });

    const port = Number(process.env.PORT) || 3000;
    const host = process.env.HOST || "0.0.0.0";

    await app.listen({ port, host });

    console.log(`Server listening at http://${host}:${port}`);
    console.log(`Documentation available at http://${host}:${port}/docs`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// Handle graceful shutdown
process.on("SIGINT", async () => {
  await DatabaseConnection.getInstance().close();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await DatabaseConnection.getInstance().close();
  process.exit(0);
});

start();
