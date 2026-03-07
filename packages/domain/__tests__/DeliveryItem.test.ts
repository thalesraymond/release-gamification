import { describe, it, expect } from "vitest";
import { DeliveryItem, Squad } from "../src/index.js";

describe("DeliveryItem", () => {
  it("should create a DeliveryItem instance with correct values", () => {
    const squad = new Squad("S123456", "Squad A");
    const item = new DeliveryItem("1", "Test Title", "Test Description", squad);

    expect(item.id).toBe("1");
    expect(item.title).toBe("Test Title");
    expect(item.description).toBe("Test Description");
    expect(item.squad).toBe(squad);
  });
});
