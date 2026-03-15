import { describe, it, expect, vi, beforeEach } from "vitest";
import { ListReleaseCalendars } from "../ListReleaseCalendars.js";
import {
  IReleaseCalendarRepository,
  ReleaseCalendar,
} from "@release-gamification/domain/src/index.js";

describe("ListReleaseCalendars", () => {
  let repository: IReleaseCalendarRepository;
  let useCase: ListReleaseCalendars;

  beforeEach(() => {
    repository = {
      save: vi.fn(),
      findById: vi.fn(),
      findAll: vi.fn(),
      findByName: vi.fn(),
      delete: vi.fn(),
    };
    useCase = new ListReleaseCalendars(repository);
  });

  it("should return a list of release calendars", async () => {
    const calendars = [
      new ReleaseCalendar("1", "Calendar 1", []),
      new ReleaseCalendar("2", "Calendar 2", []),
    ];
    vi.mocked(repository.findAll).mockResolvedValue(calendars);

    const result = await useCase.execute();

    expect(result).toBe(calendars);
    expect(repository.findAll).toHaveBeenCalled();
  });

  it("should return an empty list when no release calendars exist", async () => {
    vi.mocked(repository.findAll).mockResolvedValue([]);

    const result = await useCase.execute();

    expect(result).toEqual([]);
    expect(repository.findAll).toHaveBeenCalled();
  });
});
