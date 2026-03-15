import { describe, it, expect, afterAll, beforeAll } from "vitest";
import { CreateReleaseCalendar } from "@release-gamification/use-cases/src/CreateReleaseCalendar.js";
import { MongoReleaseCalendarRepository } from "../MongoReleaseCalendarRepository.js";
import { DatabaseConnection } from "../database.js";

describe("CreateReleaseCalendar Integration", () => {
  let repository: MongoReleaseCalendarRepository;
  let useCase: CreateReleaseCalendar;

  beforeAll(async () => {
    process.env.NODE_ENV = "test";
    repository = new MongoReleaseCalendarRepository();
    useCase = new CreateReleaseCalendar(repository);
  });

  afterAll(async () => {
    await DatabaseConnection.getInstance().close();
  });

  it("should create and persist a release calendar in MongoDB", async () => {
    const name = "Integration Test Calendar";

    const result = await useCase.execute({ name });

    expect(result.name).toBe(name);

    const persisted = await repository.findByName(name);
    expect(persisted).not.toBeNull();
    expect(persisted?.name).toBe(name);
    expect(persisted?.id).toBe(result.id);
  });

  it("should fail when trying to create a calendar with a duplicate name", async () => {
    const name = "Duplicate Calendar";

    await useCase.execute({ name });

    await expect(useCase.execute({ name })).rejects.toThrow(
      `Release calendar with name "${name}" already exists`,
    );
  });

  it("should find a release calendar by id", async () => {
    const name = "Find By Id Calendar";
    const created = await useCase.execute({ name });

    const found = await repository.findById(created.id);
    expect(found).not.toBeNull();
    expect(found?.name).toBe(name);
  });

  it("should find all release calendars", async () => {
    const initialCount = (await repository.findAll()).length;

    await useCase.execute({ name: "Find All Calendar 1" });
    await useCase.execute({ name: "Find All Calendar 2" });

    const all = await repository.findAll();
    expect(all.length).toBe(initialCount + 2);
  });
});
