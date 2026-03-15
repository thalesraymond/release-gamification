import { describe, it, expect, vi, beforeEach } from "vitest";
import { MongoReleaseCalendarRepository } from "../MongoReleaseCalendarRepository.js";
import { DatabaseConnection } from "../database.js";
import { ReleaseCalendar } from "@release-gamification/domain/src/index.js";

vi.mock("../database.js", () => {
  const mockCollection = {
    updateOne: vi.fn(),
    findOne: vi.fn(),
    find: vi.fn().mockReturnThis(),
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

describe("MongoReleaseCalendarRepository", () => {
  let repository: MongoReleaseCalendarRepository;
  let mockCollection: any;

  beforeEach(async () => {
    vi.clearAllMocks();
    repository = new MongoReleaseCalendarRepository();
    const db = await DatabaseConnection.getInstance().getDb();
    mockCollection = db.collection("release_calendars");
  });

  it("should save a release calendar", async () => {
    const calendar = new ReleaseCalendar("1", "Test Calendar", []);

    await repository.save(calendar);

    expect(mockCollection.updateOne).toHaveBeenCalledWith(
      { id: "1" },
      {
        $set: {
          id: "1",
          name: "Test Calendar",
        },
      },
      { upsert: true },
    );
  });

  it("should find a release calendar by id", async () => {
    const doc = { id: "1", name: "Test Calendar" };
    mockCollection.findOne.mockResolvedValue(doc);

    const result = await repository.findById("1");

    expect(mockCollection.findOne).toHaveBeenCalledWith({ id: "1" });
    expect(result).toBeInstanceOf(ReleaseCalendar);
    expect(result?.id).toBe("1");
    expect(result?.name).toBe("Test Calendar");
  });

  it("should return null if release calendar is not found by id", async () => {
    mockCollection.findOne.mockResolvedValue(null);

    const result = await repository.findById("non-existent");

    expect(mockCollection.findOne).toHaveBeenCalledWith({ id: "non-existent" });
    expect(result).toBeNull();
  });

  it("should find a release calendar by name", async () => {
    const doc = { id: "1", name: "Test Calendar" };
    mockCollection.findOne.mockResolvedValue(doc);

    const result = await repository.findByName("Test Calendar");

    expect(mockCollection.findOne).toHaveBeenCalledWith({
      name: "Test Calendar",
    });
    expect(result?.name).toBe("Test Calendar");
  });

  it("should return null if release calendar is not found by name", async () => {
    mockCollection.findOne.mockResolvedValue(null);

    const result = await repository.findByName("Non-existent");

    expect(mockCollection.findOne).toHaveBeenCalledWith({
      name: "Non-existent",
    });
    expect(result).toBeNull();
  });

  it("should find all release calendars", async () => {
    const docs = [
      { id: "1", name: "Calendar 1" },
      { id: "2", name: "Calendar 2" },
    ];
    mockCollection.toArray.mockResolvedValue(docs);

    const result = await repository.findAll();

    expect(mockCollection.find).toHaveBeenCalled();
    expect(result.length).toBe(2);
    expect(result[0].name).toBe("Calendar 1");
    expect(result[1].name).toBe("Calendar 2");
  });
});
