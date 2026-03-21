import { createApp } from "./app.js";
import { MongoReleaseCalendarRepository } from "@release-gamification/infrastructure/src/MongoReleaseCalendarRepository.js";
import { MongoReleaseItemRepository } from "@release-gamification/infrastructure/src/MongoReleaseItemRepository.js";
import { MongoMobileReleaseRepository } from "@release-gamification/infrastructure/src/MongoMobileReleaseRepository.js";
import { DatabaseConnection } from "@release-gamification/infrastructure/src/database.js";
import { CryptoIdGenerator } from "@release-gamification/infrastructure/src/CryptoIdGenerator.js";

const start = async () => {
  let app;
  try {
    const releaseCalendarRepository = new MongoReleaseCalendarRepository();
    const releaseItemRepository = new MongoReleaseItemRepository();
    const mobileReleaseRepository = new MongoMobileReleaseRepository();
    const idGenerator = new CryptoIdGenerator();

    app = createApp({
      releaseCalendarRepository,
      releaseItemRepository,
      mobileReleaseRepository,
      idGenerator,
    });

    const port = Number(process.env.PORT) || 3000;
    const host = process.env.HOST || "0.0.0.0";

    await app.listen({ port, host });

    app.log.info(`Server listening at http://${host}:${port}`);
    app.log.info(`Documentation available at http://${host}:${port}/docs`);
  } catch (err) {
    if (app) {
      app.log.error(err);
    } else {
      console.error(err);
    }
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
