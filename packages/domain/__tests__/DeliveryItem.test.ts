import { describe, it, expect } from "vitest";
import DeliveryItem from "../src/DeliveryItem.js";
import Group from "../src/Group.js";
import IDeliveryDetails from "../src/IDeliveryDetails.js";

class MockDeliveryDetails implements IDeliveryDetails {
  constructor(private type: string) {}
  getTitle(): string {
    return "title";
  }
  getDescription(): string {
    return "desc";
  }
  getType(): string {
    return this.type;
  }
}

describe("DeliveryItem", () => {
  const squad = new Group("groupId", "groupName", null);

  it("should create an instance with given properties", () => {
    const item = new DeliveryItem("id1", "Item Title", "Item Desc", squad, []);
    expect(item.id).toBe("id1");
    expect(item.title).toBe("Item Title");
    expect(item.description).toBe("Item Desc");
    expect(item.squad).toBe(squad);
  });

  it("should manage delivery details correctly", () => {
    const mockDetail1 = new MockDeliveryDetails("type1");
    const mockDetail2 = new MockDeliveryDetails("type2");

    const item = new DeliveryItem("id1", "Title", "Desc", squad, [mockDetail1]);
    expect(item.getDeliveryDetails()).toEqual([mockDetail1]);

    item.addDeliveryDetails(mockDetail2);
    expect(item.getDeliveryDetails()).toEqual([mockDetail1, mockDetail2]);
  });

  it("should return delivery details by type", () => {
    const type1Detail1 = new MockDeliveryDetails("type1");
    const type1Detail2 = new MockDeliveryDetails("type1");
    const type2Detail = new MockDeliveryDetails("type2");

    const item = new DeliveryItem("id1", "Title", "Desc", squad, [
      type1Detail1,
      type2Detail,
      type1Detail2,
    ]);

    expect(item.getDeliveryDetailsByType("type1")).toEqual([
      type1Detail1,
      type1Detail2,
    ]);
    expect(item.getDeliveryDetailsByType("type2")).toEqual([type2Detail]);
    expect(item.getDeliveryDetailsByType("non-existent")).toEqual([]);
  });
});
