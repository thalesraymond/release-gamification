import { Document } from "mongodb";
import ReleaseCalendar from "@release-gamification/domain/src/ReleaseCalendar.js";
import { IReleaseCalendarRepository } from "@release-gamification/domain/src/IReleaseCalendarRepository.js";
import { BaseMongoRepository } from "./BaseMongoRepository.js";

export class MongoReleaseCalendarRepository
  extends BaseMongoRepository<ReleaseCalendar>
  implements IReleaseCalendarRepository
{
  constructor() {
    super("release_calendars");
  }

  async save(entity: ReleaseCalendar): Promise<void> {
    const collection = await this.getCollection();
    await collection.updateOne(
      { id: entity.id },
      {
        $set: {
          id: entity.id,
          name: entity.name,
          // We don't persist mobileReleases here for now as they are empty in the use case
        },
      },
      { upsert: true },
    );
  }

  async findById(id: string): Promise<ReleaseCalendar | null> {
    const collection = await this.getCollection();
    const doc = await collection.findOne({ id });
    return doc ? this.mapToEntity(doc) : null;
  }

  async findAll(): Promise<ReleaseCalendar[]> {
    const collection = await this.getCollection();
    const docs = await collection
      .find()
      .project({ id: 1, name: 1, _id: 0 })
      .toArray();
    return docs.map((doc) => this.mapToEntity(doc));
  }

  async findByName(name: string): Promise<ReleaseCalendar | null> {
    const collection = await this.getCollection();
    const doc = await collection.findOne({ name });
    return doc ? this.mapToEntity(doc) : null;
  }

  protected mapToEntity(doc: Document): ReleaseCalendar {
    return new ReleaseCalendar(doc.id, doc.name, []);
  }
}
