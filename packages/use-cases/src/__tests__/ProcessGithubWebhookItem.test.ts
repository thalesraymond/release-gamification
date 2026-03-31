import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  ProcessGithubWebhookItemUseCase,
  ProcessGithubWebhookItemInput,
} from "../ProcessGithubWebhookItem.js";
import {
  IReleaseItemRepository,
  IMobileReleaseRepository,
  ReleaseItem,
  MobileRelease,
  ReleaseItemType,
  MobilePlatform,
  IIdGenerator,
  IDateProvider,
} from "@release-gamification/domain/src/index.js";

describe("ProcessGithubWebhookItemUseCase", () => {
  let releaseItemRepository: IReleaseItemRepository;
  let mobileReleaseRepository: IMobileReleaseRepository;
  let idGenerator: IIdGenerator;
  let dateProvider: IDateProvider;
  let useCase: ProcessGithubWebhookItemUseCase;

  beforeEach(() => {
    releaseItemRepository = {
      upsert: vi.fn(),
      findByRepoAndNumber: vi.fn(),
      findAll: vi.fn(),
    };
    mobileReleaseRepository = {
      save: vi.fn(),
      findByVersionAndPlatform: vi.fn().mockResolvedValue(null),
    };
    idGenerator = {
      generate: vi.fn().mockReturnValue("mocked-uuid"),
    };
    dateProvider = {
      now: vi.fn().mockReturnValue(new Date("2024-01-01T12:00:00Z")),
    };
    useCase = new ProcessGithubWebhookItemUseCase(
      releaseItemRepository,
      mobileReleaseRepository,
      idGenerator,
      dateProvider,
    );
  });

  const validInput: ProcessGithubWebhookItemInput = {
    action: "opened",
    number: 42,
    title: "Fix login bug",
    state: "open",
    type: ReleaseItemType.PULL_REQUEST,
    url: "https://github.com/owner/repo/pull/42",
    repo: "owner/repo",
    milestoneTitle: "v1.2.0 iOS",
    milestoneDueDate: new Date("2025-06-01"),
  };

  it("should process a valid PR with a valid milestone", async () => {
    const result = await useCase.execute(validInput);

    expect(result.processed).toBe(true);
    expect(result.releaseItem).toBeInstanceOf(ReleaseItem);
    expect(result.releaseItem!.repo).toBe("owner/repo");
    expect(result.releaseItem!.number).toBe(42);
    expect(result.releaseItem!.version).toBe("1.2.0");
    expect(result.releaseItem!.platform).toBe(MobilePlatform.IOS);
    expect(releaseItemRepository.upsert).toHaveBeenCalledWith(
      result.releaseItem,
    );
  });

  it("should create a new MobileRelease when none exists for the version+platform", async () => {
    vi.mocked(
      mobileReleaseRepository.findByVersionAndPlatform,
    ).mockResolvedValue(null);

    const result = await useCase.execute(validInput);

    expect(mobileReleaseRepository.save).toHaveBeenCalledOnce();
    const savedRelease = vi.mocked(mobileReleaseRepository.save).mock
      .calls[0][0];
    expect(savedRelease).toBeInstanceOf(MobileRelease);
    expect(savedRelease.version).toBe("1.2.0");
    expect(savedRelease.platform).toBe(MobilePlatform.IOS);
    expect(savedRelease.releaseDate).toEqual(new Date("2025-06-01"));
    expect(result.mobileRelease).toBe(savedRelease);
  });

  it("should reuse an existing MobileRelease without creating a new one", async () => {
    const existing = new MobileRelease(
      "existing-id",
      "1.2.0",
      new Date("2025-05-01"),
      MobilePlatform.IOS,
      [],
    );
    vi.mocked(
      mobileReleaseRepository.findByVersionAndPlatform,
    ).mockResolvedValue(existing);

    const result = await useCase.execute(validInput);

    expect(mobileReleaseRepository.save).not.toHaveBeenCalled();
    expect(result.mobileRelease).toBe(existing);
    expect(result.mobileRelease!.id).toBe("existing-id");
  });

  it("should use milestoneDueDate as the releaseDate when creating a new release", async () => {
    const dueDate = new Date("2025-12-31");
    await useCase.execute({ ...validInput, milestoneDueDate: dueDate });

    const savedRelease = vi.mocked(mobileReleaseRepository.save).mock
      .calls[0][0];
    expect(savedRelease.releaseDate).toEqual(dueDate);
  });

  it("should fall back to today when milestoneDueDate is null", async () => {
    await useCase.execute({ ...validInput, milestoneDueDate: null });

    const savedRelease = vi.mocked(mobileReleaseRepository.save).mock
      .calls[0][0];
    expect(savedRelease.releaseDate).toEqual(new Date("2024-01-01T12:00:00Z"));
  });

  it("should process a valid Android issue", async () => {
    const input: ProcessGithubWebhookItemInput = {
      ...validInput,
      type: ReleaseItemType.ISSUE,
      milestoneTitle: "v2.0.0 Android",
    };

    const result = await useCase.execute(input);

    expect(result.processed).toBe(true);
    expect(result.releaseItem!.platform).toBe(MobilePlatform.ANDROID);
    expect(result.releaseItem!.version).toBe("2.0.0");
  });

  it("should skip items with no milestone", async () => {
    const result = await useCase.execute({
      ...validInput,
      milestoneTitle: null,
    });

    expect(result.processed).toBe(false);
    expect(result.reason).toBe("No milestone associated");
    expect(mobileReleaseRepository.save).not.toHaveBeenCalled();
    expect(releaseItemRepository.upsert).not.toHaveBeenCalled();
  });

  it("should skip items with a milestone missing platform", async () => {
    const result = await useCase.execute({
      ...validInput,
      milestoneTitle: "v1.2.0",
    });

    expect(result.processed).toBe(false);
    expect(result.reason).toContain("Invalid milestone");
    expect(mobileReleaseRepository.save).not.toHaveBeenCalled();
    expect(releaseItemRepository.upsert).not.toHaveBeenCalled();
  });

  it("should skip items with a milestone missing version", async () => {
    const result = await useCase.execute({
      ...validInput,
      milestoneTitle: "iOS release",
    });

    expect(result.processed).toBe(false);
    expect(result.reason).toContain("Invalid milestone");
    expect(mobileReleaseRepository.save).not.toHaveBeenCalled();
    expect(releaseItemRepository.upsert).not.toHaveBeenCalled();
  });
});
