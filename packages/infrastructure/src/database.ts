import { MongoClient, Db } from "mongodb";
import { MongoMemoryServer } from "mongodb-memory-server";
import dotenv from "dotenv";

dotenv.config();

const DEFAULT_DB_NAME = "release_gamification";

export class DatabaseConnection {
  private static instance: DatabaseConnection;
  private client: MongoClient | null = null;
  private memoryServer: MongoMemoryServer | null = null;
  private db: Db | null = null;

  private constructor() {}

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  public async getDb(): Promise<Db> {
    if (this.db) {
      return this.db;
    }

    let uri = process.env.MONGODB_URI;
    const dbName = process.env.DB_NAME || DEFAULT_DB_NAME;

    if (!uri || process.env.NODE_ENV === "test") {
      this.memoryServer = await MongoMemoryServer.create();
      uri = this.memoryServer.getUri();
      console.log(`Using In-Memory MongoDB: ${uri}`);
    }

    this.client = new MongoClient(uri);
    await this.client.connect();
    this.db = this.client.db(dbName);

    // ⚡ Bolt Optimization:
    // Create necessary indexes for frequently queried fields to prevent full collection scans
    // and optimize upsert/lookup operations.
    // Impact: Turns O(N) collection scans into O(1) index lookups for critical webhook paths.
    await Promise.all([
      this.db
        .collection("release_items")
        .createIndex({ id: 1 }, { unique: true }),
      this.db
        .collection("release_items")
        .createIndex({ repo: 1, number: 1 }, { unique: true }),
      this.db
        .collection("mobile_releases")
        .createIndex({ id: 1 }, { unique: true }),
      this.db
        .collection("mobile_releases")
        .createIndex({ version: 1, platform: 1 }, { unique: true }),
      this.db
        .collection("release_calendars")
        .createIndex({ id: 1 }, { unique: true }),
      this.db
        .collection("release_calendars")
        .createIndex({ name: 1 }, { unique: true }),
    ]);

    return this.db;
  }

  public async close(): Promise<void> {
    if (this.client) {
      await this.client.close();
      this.client = null;
    }
    if (this.memoryServer) {
      await this.memoryServer.stop();
      this.memoryServer = null;
    }
    this.db = null;
  }
}
