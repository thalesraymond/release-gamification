import { createApp } from "./app.js";
import { MongoReleaseCalendarRepository } from "@release-gamification/infrastructure/src/MongoReleaseCalendarRepository.js";
import { DatabaseConnection } from "@release-gamification/infrastructure/src/database.js";

const start = async () => {
  try {
    const repository = new MongoReleaseCalendarRepository();

    const app = createApp({
      releaseCalendarRepository: repository,
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
