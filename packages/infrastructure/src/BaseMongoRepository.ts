import { Collection, Document } from "mongodb";
import { IBaseRepository } from "@release-gamification/domain/src/IBaseRepository.js";
import { DatabaseConnection } from "./database.js";

export abstract class BaseMongoRepository<T> implements IBaseRepository<T> {
  constructor(protected readonly collectionName: string) {}

  protected async getCollection(): Promise<Collection<Document>> {
    const db = await DatabaseConnection.getInstance().getDb();
    return db.collection(this.collectionName);
  }

  abstract save(entity: T): Promise<void>;
  abstract findById(id: string): Promise<T | null>;
  abstract findAll(): Promise<T[]>;

  protected abstract mapToEntity(doc: Document): T;
}
