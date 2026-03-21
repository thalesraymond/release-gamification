import { describe, it, expect, vi, beforeEach } from "vitest";
import { MongoMobileReleaseRepository } from "../MongoMobileReleaseRepository.js";
import { DatabaseConnection } from "../database.js";
import {
  MobileRelease,
  MobilePlatform,
} from "@release-gamification/domain/src/index.js";

vi.mock("../database.js", () => {
  const mockCollection = {
    updateOne: vi.fn(),
    findOne: vi.fn(),
    find: vi.fn().mockReturnThis(),
    project: vi.fn().mockReturnThis(),
    toArray: vi.fn(),
  };

  const mockDb = {
    collection: vi.fn().mockReturnValue(mockCollection),
  };

  return {
    DatabaseConnection: {
      getInstance: vi.fn().mockReturnValue({
        getDb: vi.fn().mockResolvedValue(mockDb),
      }),
    },
  };
});

describe("MongoMobileReleaseRepository", () => {
  let repository: MongoMobileReleaseRepository;
  let mockCollection: any;

  const sampleRelease = new MobileRelease(
    "release-id",
    "1.2.0",
    new Date("2025-06-01"),
    MobilePlatform.IOS,
    [],
  );

  beforeEach(async () => {
    vi.clearAllMocks();
    repository = new MongoMobileReleaseRepository();
    const db = await DatabaseConnection.getInstance().getDb();
    mockCollection = db.collection("mobile_releases");
  });

  it("should save a mobile release using version+platform as the key", async () => {
    await repository.save(sampleRelease);

    expect(mockCollection.updateOne).toHaveBeenCalledWith(
      { version: "1.2.0", platform: MobilePlatform.IOS },
      {
        $set: {
          id: "release-id",
          version: "1.2.0",
          platform: MobilePlatform.IOS,
          releaseDate: new Date("2025-06-01"),
        },
      },
      { upsert: true },
    );
  });

  it("should find a mobile release by version and platform", async () => {
    const doc = {
      id: "release-id",
      version: "1.2.0",
      platform: "ios",
      releaseDate: new Date("2025-06-01").toISOString(),
    };
    mockCollection.findOne.mockResolvedValue(doc);

    const result = await repository.findByVersionAndPlatform(
      "1.2.0",
      MobilePlatform.IOS,
    );

    expect(mockCollection.findOne).toHaveBeenCalledWith({
      version: "1.2.0",
      platform: MobilePlatform.IOS,
    });
    expect(result).toBeInstanceOf(MobileRelease);
    expect(result!.version).toBe("1.2.0");
    expect(result!.platform).toBe(MobilePlatform.IOS);
  });

  it("should return null when no release matches version+platform", async () => {
    mockCollection.findOne.mockResolvedValue(null);

    const result = await repository.findByVersionAndPlatform(
      "9.9.9",
      MobilePlatform.ANDROID,
    );

    expect(result).toBeNull();
  });

  it("should find all mobile releases", async () => {
    const docs = [
      {
        id: "1",
        version: "1.0.0",
        platform: "ios",
        releaseDate: new Date().toISOString(),
      },
      {
        id: "2",
        version: "2.0.0",
        platform: "android",
        releaseDate: new Date().toISOString(),
      },
    ];
    mockCollection.toArray.mockResolvedValue(docs);

    const result = await repository.findAll();

    expect(result.length).toBe(2);
    expect(result[0].version).toBe("1.0.0");
    expect(result[1].platform).toBe(MobilePlatform.ANDROID);
  });
});
