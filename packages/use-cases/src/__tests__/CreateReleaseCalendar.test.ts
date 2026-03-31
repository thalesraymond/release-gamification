import { describe, it, expect, vi, beforeEach } from "vitest";
import { CreateReleaseCalendar } from "../CreateReleaseCalendar.js";
import {
  IReleaseCalendarRepository,
  ReleaseCalendar,
  IIdGenerator,
} from "@release-gamification/domain/src/index.js";

describe("CreateReleaseCalendar", () => {
  let repository: IReleaseCalendarRepository;
  let idGenerator: IIdGenerator;
  let useCase: CreateReleaseCalendar;

  beforeEach(() => {
    repository = {
      save: vi.fn(),
      findById: vi.fn(),
      findAll: vi.fn(),
      findByName: vi.fn(),
      delete: vi.fn(),
    };
    idGenerator = {
      generate: vi.fn().mockReturnValue("mocked-uuid"),
    };
    useCase = new CreateReleaseCalendar(repository, idGenerator);
  });

  it("should create a new release calendar when name is unique", async () => {
    const name = "New Calendar";
    vi.mocked(repository.findByName).mockResolvedValue(null);

    const result = await useCase.execute({ name });

    expect(result).toBeInstanceOf(ReleaseCalendar);
    expect(result.name).toBe(name);
    expect(result.id).toBeDefined();
    expect(repository.save).toHaveBeenCalledWith(result);
  });

  it("should throw an error when name is already taken", async () => {
    const name = "Existing Calendar";
    const existingCalendar = new ReleaseCalendar("1", name, []);
    vi.mocked(repository.findByName).mockResolvedValue(existingCalendar);

    await expect(useCase.execute({ name })).rejects.toThrow(
      `Release calendar with name "${name}" already exists`,
    );
    expect(repository.save).not.toHaveBeenCalled();
  });
});
