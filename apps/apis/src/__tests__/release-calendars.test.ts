import { describe, it, expect, vi, beforeEach } from "vitest";
import { createApp } from "../app.js";
import { IReleaseCalendarRepository } from "@release-gamification/domain/src/index.js";
import { ReleaseCalendar } from "@release-gamification/domain/src/index.js";

describe("Release Calendars API", () => {
  let repository: IReleaseCalendarRepository;

  beforeEach(() => {
    repository = {
      save: vi.fn(),
      findById: vi.fn(),
      findAll: vi.fn(),
      findByName: vi.fn(),
    };
  });

  it("should create a release calendar with 201 status", async () => {
    const app = createApp({ releaseCalendarRepository: repository });
    vi.mocked(repository.findByName).mockResolvedValue(null);

    const response = await app.inject({
      method: "POST",
      url: "/release-calendars",
      payload: {
        name: "Test Calendar",
      },
    });

    expect(response.statusCode).toBe(201);
    const body = JSON.parse(response.body);
    expect(body.name).toBe("Test Calendar");
    expect(body.id).toBeDefined();
    expect(repository.save).toHaveBeenCalled();
  });

  it("should return 409 if name already exists", async () => {
    const app = createApp({ releaseCalendarRepository: repository });
    vi.mocked(repository.findByName).mockResolvedValue(
      new ReleaseCalendar("1", "Existing Calendar", []),
    );

    const response = await app.inject({
      method: "POST",
      url: "/release-calendars",
      payload: {
        name: "Existing Calendar",
      },
    });

    expect(response.statusCode).toBe(409);
    const body = JSON.parse(response.body);
    expect(body.message).toContain("already exists");
  });

  it("should return 400 for invalid input", async () => {
    const app = createApp({ releaseCalendarRepository: repository });

    const response = await app.inject({
      method: "POST",
      url: "/release-calendars",
      payload: {
        // missing name
      },
    });

    expect(response.statusCode).toBe(400);
    const body = JSON.parse(response.body);
    expect(body.message).toBe("Validation Error");
  });

  it("should return 404 for unknown routes", async () => {
    const app = createApp({ releaseCalendarRepository: repository });

    const response = await app.inject({
      method: "GET",
      url: "/unknown",
    });

    expect(response.statusCode).toBe(404);
  });

  it("should return 500 for unhandled errors", async () => {
    const app = createApp({ releaseCalendarRepository: repository });
    vi.mocked(repository.findByName).mockRejectedValue(
      new Error("Database error"),
    );

    const response = await app.inject({
      method: "POST",
      url: "/release-calendars",
      payload: {
        name: "Test Calendar",
      },
    });

    expect(response.statusCode).toBe(500);
    const body = JSON.parse(response.body);
    expect(body.message).toBe("An unexpected error occurred");
  });

  it("should have swagger docs available", async () => {
    const app = createApp({ releaseCalendarRepository: repository });

    const response = await app.inject({
      method: "GET",
      url: "/docs/",
    });

    expect(response.statusCode).toBe(200);
  });
});
