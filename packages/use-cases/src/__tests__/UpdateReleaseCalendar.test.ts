import { describe, it, expect, vi, beforeEach } from "vitest";
import { UpdateReleaseCalendar } from "../UpdateReleaseCalendar.js";
import {
  IReleaseCalendarRepository,
  ReleaseCalendar,
} from "@release-gamification/domain/src/index.js";

describe("UpdateReleaseCalendar", () => {
  let repository: IReleaseCalendarRepository;
  let useCase: UpdateReleaseCalendar;

  beforeEach(() => {
    repository = {
      save: vi.fn(),
      findById: vi.fn(),
      findAll: vi.fn(),
      findByName: vi.fn(),
      delete: vi.fn(),
    };
    useCase = new UpdateReleaseCalendar(repository);
  });

  it("should update an existing release calendar", async () => {
    const calendar = new ReleaseCalendar("1", "Old Name", []);
    vi.mocked(repository.findById).mockResolvedValue(calendar);
    vi.mocked(repository.findByName).mockResolvedValue(null);

    const result = await useCase.execute({ id: "1", name: "New Name" });

    expect(result.name).toBe("New Name");
    expect(result.id).toBe("1");
    expect(repository.save).toHaveBeenCalledWith(result);
  });

  it("should throw an error when release calendar does not exist", async () => {
    vi.mocked(repository.findById).mockResolvedValue(null);

    await expect(
      useCase.execute({ id: "non-existent", name: "New Name" }),
    ).rejects.toThrow('Release calendar with ID "non-existent" not found');
  });

  it("should throw an error when new name is already taken by another calendar", async () => {
    const calendar = new ReleaseCalendar("1", "Old Name", []);
    const otherCalendar = new ReleaseCalendar("2", "New Name", []);
    vi.mocked(repository.findById).mockResolvedValue(calendar);
    vi.mocked(repository.findByName).mockResolvedValue(otherCalendar);

    await expect(
      useCase.execute({ id: "1", name: "New Name" }),
    ).rejects.toThrow('Release calendar with name "New Name" already exists');
  });

  it("should not throw error if name is unchanged", async () => {
    const calendar = new ReleaseCalendar("1", "Same Name", []);
    vi.mocked(repository.findById).mockResolvedValue(calendar);

    const result = await useCase.execute({ id: "1", name: "Same Name" });

    expect(result.name).toBe("Same Name");
    expect(repository.findByName).not.toHaveBeenCalled();
    expect(repository.save).toHaveBeenCalled();
  });
});
