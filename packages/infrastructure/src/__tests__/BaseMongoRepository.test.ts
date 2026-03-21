import { describe, it, expect, vi, beforeEach } from "vitest";
import { BaseMongoRepository } from "../BaseMongoRepository.js";
import { DatabaseConnection } from "../database.js";
import { Document } from "mongodb";

interface DummyEntity {
  id: string;
  name: string;
}

class TestMongoRepository extends BaseMongoRepository<DummyEntity> {
  constructor() {
    super("test_collection");
  }

  // Expose protected getCollection for testing
  public async testGetCollection() {
    return this.getCollection();
  }

  async save(entity: DummyEntity): Promise<void> {
    // Dummy implementation
  }

  async findById(id: string): Promise<DummyEntity | null> {
    // Dummy implementation
    return null;
  }

  async findAll(): Promise<DummyEntity[]> {
    // Dummy implementation
    return [];
  }

  protected mapToEntity(doc: Document): DummyEntity {
    return {
      id: doc._id,
      name: doc.name,
    };
  }
}

vi.mock("../database.js", () => {
  const mockCollection = {
    deleteOne: vi.fn(),
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

describe("BaseMongoRepository", () => {
  let repository: TestMongoRepository;
  let mockCollection: any;
  let mockDb: any;

  beforeEach(async () => {
    vi.clearAllMocks();
    repository = new TestMongoRepository();
    mockDb = await DatabaseConnection.getInstance().getDb();
    mockCollection = mockDb.collection("test_collection");
  });

  describe("getCollection", () => {
    it("should return the correct collection from the database", async () => {
      const collection = await repository.testGetCollection();

      expect(mockDb.collection).toHaveBeenCalledWith("test_collection");
      expect(collection).toBe(mockCollection);
    });
  });

  describe("delete", () => {
    it("should call deleteOne on the collection with the correct id", async () => {
      const idToDelete = "dummy-id-123";

      await repository.delete(idToDelete);

      expect(mockCollection.deleteOne).toHaveBeenCalledWith({ id: idToDelete });
    });
  });
});
