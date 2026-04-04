import { Document } from "mongodb";
import ReleaseItem from "@release-gamification/domain/src/ReleaseItem.js";
import ReleaseItemType from "@release-gamification/domain/src/ReleaseItemType.js";
import MobilePlatform from "@release-gamification/domain/src/MobilePlatform.js";
import { IReleaseItemRepository } from "@release-gamification/domain/src/IReleaseItemRepository.js";
import { BaseMongoRepository } from "./BaseMongoRepository.js";

export class MongoReleaseItemRepository
  extends BaseMongoRepository<ReleaseItem>
  implements IReleaseItemRepository
{
  constructor() {
    super("release_items");
  }

  async upsert(entity: ReleaseItem): Promise<void> {
    const collection = await this.getCollection();
    await collection.updateOne(
      { repo: entity.repo, number: entity.number },
      {
        $set: {
          id: entity.id,
          repo: entity.repo,
          number: entity.number,
          title: entity.title,
          state: entity.state,
          type: entity.type,
          milestoneTitle: entity.milestoneTitle,
          version: entity.version,
          platform: entity.platform,
          url: entity.url,
        },
      },
      { upsert: true },
    );
  }

  async save(entity: ReleaseItem): Promise<void> {
    return this.upsert(entity);
  }

  async findById(id: string): Promise<ReleaseItem | null> {
    const collection = await this.getCollection();
    const doc = await collection.findOne({ id });
    return doc ? this.mapToEntity(doc) : null;
  }

  async findByRepoAndNumber(
    repo: string,
    number: number,
  ): Promise<ReleaseItem | null> {
    const collection = await this.getCollection();
    const doc = await collection.findOne({ repo, number });
    return doc ? this.mapToEntity(doc) : null;
  }

  async findAll(): Promise<ReleaseItem[]> {
    const collection = await this.getCollection();
    const docs = await collection
      .find()
      .project({
        id: 1,
        repo: 1,
        number: 1,
        title: 1,
        state: 1,
        type: 1,
        milestoneTitle: 1,
        version: 1,
        platform: 1,
        url: 1,
        _id: 0,
      })
      .toArray();
    return docs.map((doc) => this.mapToEntity(doc));
  }

  protected mapToEntity(doc: Document): ReleaseItem {
    return new ReleaseItem(
      doc.id,
      doc.repo,
      doc.number,
      doc.title,
      doc.state,
      doc.type as ReleaseItemType,
      doc.milestoneTitle,
      doc.version,
      doc.platform as MobilePlatform,
      doc.url,
    );
  }
}
