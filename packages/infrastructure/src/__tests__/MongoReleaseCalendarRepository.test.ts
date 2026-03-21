import { describe, it, expect, vi, beforeEach } from "vitest";
import { MongoReleaseCalendarRepository } from "../MongoReleaseCalendarRepository.js";
import { DatabaseConnection } from "../database.js";
import {
  ReleaseCalendar,
  MobileRelease,
  MobilePlatform,
  DeliveryItem,
  Group,
  DeliveryGithubIssueDetails,
  DeliveryGithubPullRequestDetails,
  DeliveryServiceNowChangeDetails,
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
          mobileReleases: [],
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

  it("should find all release calendars with projection", async () => {
    const docs = [
      { id: "1", name: "Calendar 1" },
      { id: "2", name: "Calendar 2" },
    ];
    mockCollection.toArray.mockResolvedValue(docs);

    const result = await repository.findAll();

    expect(mockCollection.find).toHaveBeenCalled();
    expect(mockCollection.project).toHaveBeenCalledWith({
      id: 1,
      name: 1,
      _id: 0,
    });
    expect(result.length).toBe(2);
    expect(result[0].name).toBe("Calendar 1");
    expect(result[1].name).toBe("Calendar 2");
  });

  it("should delete a release calendar", async () => {
    await repository.delete("1");

    expect(mockCollection.deleteOne).toHaveBeenCalledWith({ id: "1" });
  });

  it("should save and reconstruct a complex release calendar with mobile releases", async () => {
    const parentGroup = new Group("pg1", "Parent Group", null);
    const squad = new Group("s1", "Squad 1", parentGroup);
    const githubIssue = new DeliveryGithubIssueDetails(
      123,
      "https://github.com/issue/123",
      "Issue Title",
      "Issue Body",
    );
    const githubPR = new DeliveryGithubPullRequestDetails(
      456,
      "https://github.com/pr/456",
      "PR Title",
      "PR Body",
      10,
    );
    const snChange = new DeliveryServiceNowChangeDetails(
      "CHG001",
      "CHG0000001",
      "SN Short Desc",
      "SN Desc",
    );

    const deliveryItem = new DeliveryItem(
      "di1",
      "Delivery Item 1",
      "Description 1",
      squad,
      [githubIssue, githubPR, snChange],
    );

    const mobileRelease = new MobileRelease(
      "mr1",
      "1.0.0",
      new Date("2024-01-01T10:00:00Z"),
      MobilePlatform.IOS,
      [deliveryItem],
    );

    const calendar = new ReleaseCalendar("c1", "Complex Calendar", [
      mobileRelease,
    ]);

    await repository.save(calendar);

    expect(mockCollection.updateOne).toHaveBeenCalledWith(
      { id: "c1" },
      expect.objectContaining({
        $set: expect.objectContaining({
          id: "c1",
          name: "Complex Calendar",
          mobileReleases: [
            expect.objectContaining({
              id: "mr1",
              version: "1.0.0",
              releaseDate: "2024-01-01T10:00:00.000Z",
              platform: "ios",
              deliveryItems: [
                expect.objectContaining({
                  id: "di1",
                  title: "Delivery Item 1",
                  squad: expect.objectContaining({
                    id: "s1",
                    name: "Squad 1",
                    parent: { id: "pg1", name: "Parent Group" },
                  }),
                  deliveryDetails: [
                    {
                      type: "github_issue",
                      number: 123,
                      url: "https://github.com/issue/123",
                      title: "Issue Title",
                      body: "Issue Body",
                    },
                    {
                      type: "github_pull_request",
                      number: 456,
                      url: "https://github.com/pr/456",
                      title: "PR Title",
                      body: "PR Body",
                      changesCount: 10,
                    },
                    {
                      type: "servicenow_change",
                      changeId: "CHG001",
                      changeNumber: "CHG0000001",
                      shortDescription: "SN Short Desc",
                      description: "SN Desc",
                    },
                  ],
                }),
              ],
            }),
          ],
        }),
      }),
      { upsert: true },
    );

    // Test reconstruction
    const doc = {
      id: "c1",
      name: "Complex Calendar",
      mobileReleases: [
        {
          id: "mr1",
          version: "1.0.0",
          releaseDate: "2024-01-01T10:00:00.000Z",
          platform: "ios",
          deliveryItems: [
            {
              id: "di1",
              title: "Delivery Item 1",
              description: "Description 1",
              squad: {
                id: "s1",
                name: "Squad 1",
                parent: { id: "pg1", name: "Parent Group" },
              },
              deliveryDetails: [
                {
                  type: "github_issue",
                  number: 123,
                  url: "https://github.com/issue/123",
                  title: "Issue Title",
                  body: "Issue Body",
                },
                {
                  type: "github_pull_request",
                  number: 456,
                  url: "https://github.com/pr/456",
                  title: "PR Title",
                  body: "PR Body",
                  changesCount: 10,
                },
                {
                  type: "servicenow_change",
                  changeId: "CHG001",
                  changeNumber: "CHG0000001",
                  shortDescription: "SN Short Desc",
                  description: "SN Desc",
                },
              ],
            },
          ],
        },
      ],
    };
    mockCollection.findOne.mockResolvedValue(doc);

    const result = await repository.findById("c1");

    expect(result).toBeInstanceOf(ReleaseCalendar);
    expect(result?.mobileReleases.length).toBe(1);
    const mr = result!.mobileReleases[0];
    expect(mr).toBeInstanceOf(MobileRelease);
    expect(mr.id).toBe("mr1");
    expect(mr.version).toBe("1.0.0");
    expect(mr.releaseDate.toISOString()).toBe("2024-01-01T10:00:00.000Z");
    expect(mr.platform).toBe(MobilePlatform.IOS);

    expect(mr.getDeliveryItems().length).toBe(1);
    const di = mr.getDeliveryItems()[0];
    expect(di).toBeInstanceOf(DeliveryItem);
    expect(di.id).toBe("di1");
    expect(di.title).toBe("Delivery Item 1");
    expect(di.squad).toBeInstanceOf(Group);
    expect(di.squad.id).toBe("s1");
    expect(di.squad.parent?.id).toBe("pg1");

    expect(di.getDeliveryDetails().length).toBe(3);
    expect(di.getDeliveryDetails()[0]).toBeInstanceOf(
      DeliveryGithubIssueDetails,
    );
    expect(di.getDeliveryDetails()[1]).toBeInstanceOf(
      DeliveryGithubPullRequestDetails,
    );
    expect(di.getDeliveryDetails()[2]).toBeInstanceOf(
      DeliveryServiceNowChangeDetails,
    );

    const ghIssue = di.getDeliveryDetails()[0] as DeliveryGithubIssueDetails;
    expect(ghIssue.number).toBe(123);
    expect(ghIssue.getType()).toBe("github_issue");

    const ghPR = di.getDeliveryDetails()[1] as DeliveryGithubPullRequestDetails;
    expect(ghPR.changesCount).toBe(10);
    expect(ghPR.getType()).toBe("github_pull_request");

    const sn = di.getDeliveryDetails()[2] as DeliveryServiceNowChangeDetails;
    expect(sn.changeId).toBe("CHG001");
    expect(sn.getType()).toBe("servicenow_change");
  });
});
