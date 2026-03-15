import { describe, it, expect, vi, beforeEach } from "vitest";
import { GetReleaseCalendar } from "../GetReleaseCalendar.js";
import {
  IReleaseCalendarRepository,
  ReleaseCalendar,
} from "@release-gamification/domain/src/index.js";

describe("GetReleaseCalendar", () => {
  let repository: IReleaseCalendarRepository;
  let useCase: GetReleaseCalendar;

  beforeEach(() => {
    repository = {
      save: vi.fn(),
      findById: vi.fn(),
      findAll: vi.fn(),
      findByName: vi.fn(),
      delete: vi.fn(),
    };
    useCase = new GetReleaseCalendar(repository);
  });

  it("should return a release calendar when it exists", async () => {
    const calendar = new ReleaseCalendar("1", "Test Calendar", []);
    vi.mocked(repository.findById).mockResolvedValue(calendar);

    const result = await useCase.execute({ id: "1" });

    expect(result).toBe(calendar);
    expect(repository.findById).toHaveBeenCalledWith("1");
  });

  it("should throw an error when release calendar does not exist", async () => {
    vi.mocked(repository.findById).mockResolvedValue(null);

    await expect(useCase.execute({ id: "non-existent" })).rejects.toThrow(
      'Release calendar with ID "non-existent" not found',
    );
  });
});
