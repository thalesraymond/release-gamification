import { describe, it, expect, vi, beforeEach } from "vitest";
import { createApp } from "../app.js";
import { IReleaseCalendarRepository, IIdGenerator } from "@release-gamification/domain/src/index.js";
import { ReleaseCalendar } from "@release-gamification/domain/src/index.js";

describe("Release Calendars API", () => {
  let repository: IReleaseCalendarRepository;
  let idGenerator: IIdGenerator;

  const mockReleaseItemRepository = {
    upsert: vi.fn(),
    findByRepoAndNumber: vi.fn(),
    findAll: vi.fn(),
  };

  const mockMobileReleaseRepository = {
    save: vi.fn(),
    findByVersionAndPlatform: vi.fn(),
  };

  function buildApp() {
    return createApp({
      releaseCalendarRepository: repository,
      releaseItemRepository: mockReleaseItemRepository,
      mobileReleaseRepository: mockMobileReleaseRepository,
      idGenerator,
    });
  }

  beforeEach(() => {
    repository = {
      save: vi.fn(),
      findById: vi.fn(),
      findAll: vi.fn(),
      findByName: vi.fn(),
      delete: vi.fn(),
    };
    idGenerator = {
      generate: vi.fn().mockReturnValue("00000000-0000-0000-0000-000000000000"),
    };
  });

  it("should create a release calendar with 201 status", async () => {
    const app = buildApp();
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
    const app = buildApp();
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
    const app = buildApp();

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
    const app = buildApp();

    const response = await app.inject({
      method: "GET",
      url: "/unknown",
    });

    expect(response.statusCode).toBe(404);
  });

  it("should return 500 for unhandled errors", async () => {
    const app = buildApp();
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

  it("should list all release calendars", async () => {
    const app = buildApp();
    const calendars = [
      new ReleaseCalendar(
        "550e8400-e29b-41d4-a716-446655440000",
        "Calendar 1",
        [],
      ),
      new ReleaseCalendar(
        "550e8400-e29b-41d4-a716-446655440001",
        "Calendar 2",
        [],
      ),
    ];
    vi.mocked(repository.findAll).mockResolvedValue(calendars);

    const response = await app.inject({
      method: "GET",
      url: "/release-calendars",
    });

    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.body);
    expect(body).toHaveLength(2);
    expect(body[0].name).toBe("Calendar 1");
    expect(body[1].name).toBe("Calendar 2");
  });

  it("should get a single release calendar", async () => {
    const app = buildApp();
    const calendar = new ReleaseCalendar(
      "550e8400-e29b-41d4-a716-446655440000",
      "Test Calendar",
      [],
    );
    vi.mocked(repository.findById).mockResolvedValue(calendar);

    const response = await app.inject({
      method: "GET",
      url: "/release-calendars/550e8400-e29b-41d4-a716-446655440000",
    });

    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.body);
    expect(body.id).toBe("550e8400-e29b-41d4-a716-446655440000");
    expect(body.name).toBe("Test Calendar");
  });

  it("should return 404 when getting a non-existent calendar", async () => {
    const app = buildApp();
    vi.mocked(repository.findById).mockResolvedValue(null);

    const response = await app.inject({
      method: "GET",
      url: "/release-calendars/550e8400-e29b-41d4-a716-446655440000",
    });

    expect(response.statusCode).toBe(404);
  });

  it("should update an existing release calendar", async () => {
    const app = buildApp();
    vi.mocked(repository.findById).mockResolvedValue(
      new ReleaseCalendar(
        "550e8400-e29b-41d4-a716-446655440000",
        "Old Name",
        [],
      ),
    );
    vi.mocked(repository.findByName).mockResolvedValue(null);

    const response = await app.inject({
      method: "PUT",
      url: "/release-calendars/550e8400-e29b-41d4-a716-446655440000",
      payload: {
        name: "Updated Name",
      },
    });

    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.body);
    expect(body.name).toBe("Updated Name");
  });

  it("should delete a release calendar", async () => {
    const app = buildApp();
    vi.mocked(repository.findById).mockResolvedValue(
      new ReleaseCalendar(
        "550e8400-e29b-41d4-a716-446655440000",
        "To Delete",
        [],
      ),
    );
    vi.mocked(repository.delete).mockResolvedValue(undefined);

    const response = await app.inject({
      method: "DELETE",
      url: "/release-calendars/550e8400-e29b-41d4-a716-446655440000",
    });

    expect(response.statusCode).toBe(204);
    expect(repository.delete).toHaveBeenCalledWith(
      "550e8400-e29b-41d4-a716-446655440000",
    );
  });

  it("should have swagger docs available", async () => {
    const app = buildApp();

    const response = await app.inject({
      method: "GET",
      url: "/docs/json",
    });

    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.body);
    expect(body.paths["/release-calendars"]).toBeDefined();
    expect(body.paths["/release-calendars"].get).toBeDefined();
    expect(body.paths["/release-calendars"].post).toBeDefined();
    expect(body.paths["/release-calendars/{id}"]).toBeDefined();
    expect(body.paths["/release-calendars/{id}"].get).toBeDefined();
    expect(body.paths["/release-calendars/{id}"].put).toBeDefined();
    expect(body.paths["/release-calendars/{id}"].delete).toBeDefined();
  });
});
