import { Collection, Document } from "mongodb";
import { IBaseRepository } from "@release-gamification/domain/src/IBaseRepository.js";
import { DatabaseConnection } from "./database.js";

export abstract class BaseMongoRepository<T> implements IBaseRepository<T> {
  private cachedCollection: Collection<Document> | null = null;

  constructor(protected readonly collectionName: string) {}

  protected async getCollection(): Promise<Collection<Document>> {
    if (this.cachedCollection) {
      return this.cachedCollection;
    }
    const db = await DatabaseConnection.getInstance().getDb();
    this.cachedCollection = db.collection(this.collectionName);
    return this.cachedCollection;
  }

  abstract save(entity: T): Promise<void>;
  abstract findById(id: string): Promise<T | null>;
  abstract findAll(): Promise<T[]>;

  async delete(id: string): Promise<void> {
    const collection = await this.getCollection();
    await collection.deleteOne({ id: id } as any);
  }

  protected abstract mapToEntity(doc: Document): T;
}
