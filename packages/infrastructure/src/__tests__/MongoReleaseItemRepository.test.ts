import { describe, it, expect, vi, beforeEach } from "vitest";
import { MongoReleaseItemRepository } from "../MongoReleaseItemRepository.js";
import { DatabaseConnection } from "../database.js";
import {
  ReleaseItem,
  ReleaseItemType,
  MobilePlatform,
} from "@release-gamification/domain/src/index.js";

vi.mock("../database.js", () => {
  const mockCollection = {
    updateOne: vi.fn(),
    findOne: vi.fn(),
    deleteOne: vi.fn(),
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

describe("MongoReleaseItemRepository", () => {
  let repository: MongoReleaseItemRepository;
  let mockCollection: any;

  beforeEach(async () => {
    vi.clearAllMocks();
    repository = new MongoReleaseItemRepository();
    const db = await DatabaseConnection.getInstance().getDb();
    mockCollection = db.collection("release_items");
  });

  const sampleItem = new ReleaseItem(
    "test-id",
    "owner/repo",
    42,
    "Fix login bug",
    "open",
    ReleaseItemType.PULL_REQUEST,
    "v1.2.0 iOS",
    "1.2.0",
    MobilePlatform.IOS,
    "https://github.com/owner/repo/pull/42",
  );

  it("should upsert a release item using repo and number as the key", async () => {
    await repository.upsert(sampleItem);

    expect(mockCollection.updateOne).toHaveBeenCalledWith(
      { repo: "owner/repo", number: 42 },
      {
        $set: {
          id: "test-id",
          repo: "owner/repo",
          number: 42,
          title: "Fix login bug",
          state: "open",
          type: ReleaseItemType.PULL_REQUEST,
          milestoneTitle: "v1.2.0 iOS",
          version: "1.2.0",
          platform: MobilePlatform.IOS,
          url: "https://github.com/owner/repo/pull/42",
        },
      },
      { upsert: true },
    );
  });

  it("should find a release item by repo and number", async () => {
    const doc = {
      id: "test-id",
      repo: "owner/repo",
      number: 42,
      title: "Fix login bug",
      state: "open",
      type: "pull_request",
      milestoneTitle: "v1.2.0 iOS",
      version: "1.2.0",
      platform: "ios",
      url: "https://github.com/owner/repo/pull/42",
    };
    mockCollection.findOne.mockResolvedValue(doc);

    const result = await repository.findByRepoAndNumber("owner/repo", 42);

    expect(mockCollection.findOne).toHaveBeenCalledWith({
      repo: "owner/repo",
      number: 42,
    });
    expect(result).toBeInstanceOf(ReleaseItem);
    expect(result!.repo).toBe("owner/repo");
    expect(result!.number).toBe(42);
  });

  it("should return null when item not found by repo and number", async () => {
    mockCollection.findOne.mockResolvedValue(null);

    const result = await repository.findByRepoAndNumber("owner/repo", 999);

    expect(result).toBeNull();
  });

  it("should find all release items", async () => {
    const docs = [
      {
        id: "1",
        repo: "owner/repo",
        number: 1,
        title: "Item 1",
        state: "open",
        type: "issue",
        milestoneTitle: "v1.0.0 iOS",
        version: "1.0.0",
        platform: "ios",
        url: "https://github.com/owner/repo/issues/1",
      },
      {
        id: "2",
        repo: "owner/repo",
        number: 2,
        title: "Item 2",
        state: "closed",
        type: "pull_request",
        milestoneTitle: "v2.0.0 Android",
        version: "2.0.0",
        platform: "android",
        url: "https://github.com/owner/repo/pull/2",
      },
    ];
    mockCollection.toArray.mockResolvedValue(docs);

    const result = await repository.findAll();

    expect(mockCollection.find).toHaveBeenCalled();
    expect(result.length).toBe(2);
    expect(result[0].title).toBe("Item 1");
    expect(result[1].title).toBe("Item 2");
  });
});
