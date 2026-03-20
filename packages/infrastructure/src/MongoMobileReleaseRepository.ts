import { Document } from "mongodb";
import MobileRelease from "@release-gamification/domain/src/MobileRelease.js";
import MobilePlatform from "@release-gamification/domain/src/MobilePlatform.js";
import { IMobileReleaseRepository } from "@release-gamification/domain/src/IMobileReleaseRepository.js";
import { BaseMongoRepository } from "./BaseMongoRepository.js";
import DeliveryItem from "@release-gamification/domain/src/DeliveryItem.js";

export class MongoMobileReleaseRepository
  extends BaseMongoRepository<MobileRelease>
  implements IMobileReleaseRepository
{
  constructor() {
    super("mobile_releases");
  }

  async save(entity: MobileRelease): Promise<void> {
    const collection = await this.getCollection();
    await collection.updateOne(
      { version: entity.version, platform: entity.platform },
      {
        $set: {
          id: entity.id,
          version: entity.version,
          platform: entity.platform,
          releaseDate: entity.releaseDate,
        },
      },
      { upsert: true },
    );
  }

  async findByVersionAndPlatform(
    version: string,
    platform: MobilePlatform,
  ): Promise<MobileRelease | null> {
    const collection = await this.getCollection();
    const doc = await collection.findOne({ version, platform });
    return doc ? this.mapToEntity(doc) : null;
  }

  async findById(id: string): Promise<MobileRelease | null> {
    const collection = await this.getCollection();
    const doc = await collection.findOne({ id });
    return doc ? this.mapToEntity(doc) : null;
  }

  async findAll(): Promise<MobileRelease[]> {
    const collection = await this.getCollection();
    const docs = await collection.find().toArray();
    return docs.map((doc) => this.mapToEntity(doc));
  }

  protected mapToEntity(doc: Document): MobileRelease {
    return new MobileRelease(
      doc.id,
      doc.version,
      new Date(doc.releaseDate),
      doc.platform as MobilePlatform,
      [] as DeliveryItem[],
    );
  }
}
