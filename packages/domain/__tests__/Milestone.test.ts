import { describe, it, expect } from "vitest";
import Milestone from "../src/Milestone.js";
import MobilePlatform from "../src/MobilePlatform.js";

describe("Milestone", () => {
  describe("parse", () => {
    it("should parse a milestone with version and iOS platform", () => {
      const milestone = Milestone.parse("v1.2.0 iOS");

      expect(milestone).not.toBeNull();
      expect(milestone!.version).toBe("1.2.0");
      expect(milestone!.platform).toBe(MobilePlatform.IOS);
      expect(milestone!.title).toBe("v1.2.0 iOS");
    });

    it("should parse a milestone with version and Android platform", () => {
      const milestone = Milestone.parse("v2.0.0 Android");

      expect(milestone).not.toBeNull();
      expect(milestone!.version).toBe("2.0.0");
      expect(milestone!.platform).toBe(MobilePlatform.ANDROID);
    });

    it("should parse milestone without 'v' prefix", () => {
      const milestone = Milestone.parse("1.5.3 iOS");

      expect(milestone).not.toBeNull();
      expect(milestone!.version).toBe("1.5.3");
      expect(milestone!.platform).toBe(MobilePlatform.IOS);
    });

    it("should parse milestone with two-part version", () => {
      const milestone = Milestone.parse("v3.0 Android");

      expect(milestone).not.toBeNull();
      expect(milestone!.version).toBe("3.0");
      expect(milestone!.platform).toBe(MobilePlatform.ANDROID);
    });

    it("should return null when milestone has no platform", () => {
      const milestone = Milestone.parse("v1.2.0");
      expect(milestone).toBeNull();
    });

    it("should return null when milestone has no version", () => {
      const milestone = Milestone.parse("iOS release");
      expect(milestone).toBeNull();
    });

    it("should return null for empty string", () => {
      const milestone = Milestone.parse("");
      expect(milestone).toBeNull();
    });

    it("should recognize 'iphone' as iOS platform", () => {
      const milestone = Milestone.parse("v1.0.0 iPhone");

      expect(milestone).not.toBeNull();
      expect(milestone!.platform).toBe(MobilePlatform.IOS);
    });

    it("should be case insensitive for platform", () => {
      const milestone = Milestone.parse("v1.0.0 ANDROID");

      expect(milestone).not.toBeNull();
      expect(milestone!.platform).toBe(MobilePlatform.ANDROID);
    });
  });
});
