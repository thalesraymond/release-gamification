import { describe, it, expect } from "vitest";
import DeliveryServiceNowChangeDetails from "../src/DeliveryServiceNowChangeDetails.js";

describe("DeliveryServiceNowChangeDetails", () => {
  it("should create an instance correctly and retain its properties", () => {
    const change = new DeliveryServiceNowChangeDetails(
      "sys_id_123",
      "CHG0001234",
      "Deploy new server",
      "Deploying the new production server.",
    );

    expect(change.changeId).toBe("sys_id_123");
    expect(change.changeNumber).toBe("CHG0001234");
    expect(change.shortDescription).toBe("Deploy new server");
    expect(change.description).toBe("Deploying the new production server.");
  });

  it("should return shortDescription when getTitle is called", () => {
    const change = new DeliveryServiceNowChangeDetails(
      "id",
      "num",
      "short",
      "long",
    );
    expect(change.getTitle()).toBe("short");
  });

  it("should return description when getDescription is called", () => {
    const change = new DeliveryServiceNowChangeDetails(
      "id",
      "num",
      "short",
      "long",
    );
    expect(change.getDescription()).toBe("long");
  });

  it("should return 'servicenow_change' when getType is called", () => {
    const change = new DeliveryServiceNowChangeDetails(
      "id",
      "num",
      "short",
      "long",
    );
    expect(change.getType()).toBe("servicenow_change");
  });
});
