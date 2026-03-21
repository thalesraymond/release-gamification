import { Document } from "mongodb";
import {
  ReleaseCalendar,
  MobileRelease,
  MobilePlatform,
  DeliveryItem,
  Group,
  DeliveryGithubIssueDetails,
  DeliveryGithubPullRequestDetails,
  DeliveryServiceNowChangeDetails,
  IReleaseCalendarRepository,
} from "@release-gamification/domain/src/index.js";
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
          mobileReleases: entity.mobileReleases.map((mr) => ({
            id: mr.id,
            version: mr.version,
            releaseDate: mr.releaseDate.toISOString(),
            platform: mr.platform,
            deliveryItems: mr.getDeliveryItems().map((di) => ({
              id: di.id,
              title: di.title,
              description: di.description,
              squad: {
                id: di.squad.id,
                name: di.squad.name,
                parent: di.squad.parent
                  ? {
                      id: di.squad.parent.id,
                      name: di.squad.parent.name,
                    }
                  : null,
              },
              deliveryDetails: di.getDeliveryDetails().map((dd) => {
                const type = dd.getType();
                if (dd instanceof DeliveryGithubIssueDetails) {
                  return {
                    type,
                    number: dd.number,
                    url: dd.url,
                    title: dd.title,
                    body: dd.body,
                  };
                }
                if (dd instanceof DeliveryGithubPullRequestDetails) {
                  return {
                    type,
                    number: dd.number,
                    url: dd.url,
                    title: dd.title,
                    body: dd.body,
                    changesCount: dd.changesCount,
                  };
                }
                if (dd instanceof DeliveryServiceNowChangeDetails) {
                  return {
                    type,
                    changeId: dd.changeId,
                    changeNumber: dd.changeNumber,
                    shortDescription: dd.shortDescription,
                    description: dd.description,
                  };
                }
                return { type };
              }),
            })),
          })),
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
    const mobileReleases = (doc.mobileReleases || []).map((mr: any) => {
      const deliveryItems = (mr.deliveryItems || []).map((di: any) => {
        const deliveryDetails = (di.deliveryDetails || []).map((dd: any) => {
          switch (dd.type) {
            case "github_issue":
              return new DeliveryGithubIssueDetails(
                dd.number,
                dd.url,
                dd.title,
                dd.body,
              );
            case "github_pull_request":
              return new DeliveryGithubPullRequestDetails(
                dd.number,
                dd.url,
                dd.title,
                dd.body,
                dd.changesCount,
              );
            case "servicenow_change":
              return new DeliveryServiceNowChangeDetails(
                dd.changeId,
                dd.changeNumber,
                dd.shortDescription,
                dd.description,
              );
            default:
              throw new Error(`Unknown delivery detail type: ${dd.type}`);
          }
        });
        const squad = new Group(
          di.squad.id,
          di.squad.name,
          di.squad.parent ? new Group(di.squad.parent.id, di.squad.parent.name, null) : null,
        );
        return new DeliveryItem(
          di.id,
          di.title,
          di.description,
          squad,
          deliveryDetails,
        );
      });
      return new MobileRelease(
        mr.id,
        mr.version,
        new Date(mr.releaseDate),
        mr.platform as MobilePlatform,
        deliveryItems,
      );
    });
    return new ReleaseCalendar(doc.id, doc.name, mobileReleases);
  }
}
