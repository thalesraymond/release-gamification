import { describe, it, expect, vi, beforeEach } from "vitest";
import { DeleteReleaseCalendar } from "../DeleteReleaseCalendar.js";
import {
  IReleaseCalendarRepository,
  ReleaseCalendar,
} from "@release-gamification/domain/src/index.js";

describe("DeleteReleaseCalendar", () => {
  let repository: IReleaseCalendarRepository;
  let useCase: DeleteReleaseCalendar;

  beforeEach(() => {
    repository = {
      save: vi.fn(),
      findById: vi.fn(),
      findAll: vi.fn(),
      findByName: vi.fn(),
      delete: vi.fn(),
    };
    useCase = new DeleteReleaseCalendar(repository);
  });

  it("should delete a release calendar when it exists", async () => {
    const calendar = new ReleaseCalendar("1", "Test Calendar", []);
    vi.mocked(repository.findById).mockResolvedValue(calendar);

    await useCase.execute({ id: "1" });

    expect(repository.delete).toHaveBeenCalledWith("1");
  });

  it("should throw an error when release calendar does not exist", async () => {
    vi.mocked(repository.findById).mockResolvedValue(null);

    await expect(useCase.execute({ id: "non-existent" })).rejects.toThrow(
      'Release calendar with ID "non-existent" not found',
    );
    expect(repository.delete).not.toHaveBeenCalled();
  });
});
