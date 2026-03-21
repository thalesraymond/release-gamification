import { describe, it, expect, vi } from "vitest";
import { createApp } from "../app.js";
import {
  IReleaseCalendarRepository,
  IReleaseItemRepository,
  IMobileReleaseRepository,
} from "@release-gamification/domain/src/index.js";

describe("App", () => {
  const mockReleaseCalendarRepository: IReleaseCalendarRepository = {
    save: vi.fn(),
    findById: vi.fn(),
    findAll: vi.fn(),
    findByName: vi.fn(),
    delete: vi.fn(),
  };

  const mockReleaseItemRepository: IReleaseItemRepository = {
    upsert: vi.fn(),
    findByRepoAndNumber: vi.fn(),
    findAll: vi.fn(),
  };

  const mockMobileReleaseRepository: IMobileReleaseRepository = {
    save: vi.fn(),
    findByVersionAndPlatform: vi.fn(),
  };

  function buildApp() {
    return createApp({
      releaseCalendarRepository: mockReleaseCalendarRepository,
      releaseItemRepository: mockReleaseItemRepository,
      mobileReleaseRepository: mockMobileReleaseRepository,
    });
  }

  it("should return 404 for an unknown route", async () => {
    const app = buildApp();
    const response = await app.inject({
      method: "GET",
      url: "/invalid-route-that-does-not-exist",
    });

    expect(response.statusCode).toBe(404);
    const body = JSON.parse(response.body);
    expect(body).toEqual({
      statusCode: 404,
      error: "Not Found",
      message: "Resource not found",
    });
  });
});
