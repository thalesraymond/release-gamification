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
      console.log("Using In-Memory MongoDB");
    }

    this.client = new MongoClient(uri);
    await this.client.connect();
    this.db = this.client.db(dbName);

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
