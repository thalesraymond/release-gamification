import { describe, it, expect } from "vitest";
import MobileRelease from "../src/MobileRelease.js";
import MobilePlatform from "../src/MobilePlatform.js";
import DeliveryItem from "../src/DeliveryItem.js";
import Group from "../src/Group.js";

describe("MobileRelease", () => {
  const squad = new Group("groupId", "Squad Name", null);
  const item1 = new DeliveryItem("item1", "Title 1", "Desc 1", squad, []);
  const item2 = new DeliveryItem("item2", "Title 2", "Desc 2", squad, []);

  it("should create an instance correctly", () => {
    const releaseDate = new Date("2023-01-01T00:00:00.000Z");
    const release = new MobileRelease(
      "rel1",
      "1.0.0",
      releaseDate,
      MobilePlatform.IOS,
      [],
    );

    expect(release.id).toBe("rel1");
    expect(release.version).toBe("1.0.0");
    expect(release.releaseDate).toEqual(releaseDate);
    expect(release.platform).toBe(MobilePlatform.IOS);
  });

  it("should return a copy of delivery items", () => {
    const release = new MobileRelease(
      "rel1",
      "1.0.0",
      new Date(),
      MobilePlatform.ANDROID,
      [item1],
    );

    const items = release.getDeliveryItems();
    expect(items).toEqual([item1]);

    // Ensure it's a copy
    items.push(item2);
    expect(release.getDeliveryItems()).toEqual([item1]);
  });

  it("should add a delivery item correctly", () => {
    const release = new MobileRelease(
      "rel1",
      "1.0.0",
      new Date(),
      MobilePlatform.IOS,
      [item1],
    );

    release.addDeliveryItem(item2);
    expect(release.getDeliveryItems()).toEqual([item1, item2]);
  });

  it("should add multiple delivery items correctly", () => {
    const item3 = new DeliveryItem("item3", "Title 3", "Desc 3", squad, []);
    const release = new MobileRelease(
      "rel1",
      "1.0.0",
      new Date(),
      MobilePlatform.ANDROID,
      [item1],
    );

    release.addDeliveryItems([item2, item3]);
    expect(release.getDeliveryItems()).toEqual([item1, item2, item3]);
  });
});
