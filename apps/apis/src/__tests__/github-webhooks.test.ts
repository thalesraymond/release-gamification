import { describe, it, expect, vi, beforeEach } from "vitest";
import { createApp } from "../app.js";
import {
  IReleaseCalendarRepository,
  IReleaseItemRepository,
  IMobileReleaseRepository,
  MobileRelease,
  MobilePlatform,
} from "@release-gamification/domain/src/index.js";

describe("GitHub Webhooks API", () => {
  let releaseItemRepository: IReleaseItemRepository;
  let mobileReleaseRepository: IMobileReleaseRepository;
  let releaseCalendarRepository: IReleaseCalendarRepository;

  function buildApp() {
    return createApp({
      releaseCalendarRepository,
      releaseItemRepository,
      mobileReleaseRepository,
    });
  }

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
    releaseCalendarRepository = {
      save: vi.fn(),
      findById: vi.fn(),
      findAll: vi.fn(),
      findByName: vi.fn(),
      delete: vi.fn(),
    };
  });

  const validPRPayload = {
    action: "opened",
    pull_request: {
      number: 42,
      title: "Fix login bug",
      state: "open",
      html_url: "https://github.com/owner/repo/pull/42",
      milestone: {
        title: "v1.2.0 iOS",
        due_on: "2025-06-01T00:00:00Z",
      },
    },
    repository: {
      full_name: "owner/repo",
    },
  };

  const validIssuePayload = {
    action: "opened",
    issue: {
      number: 10,
      title: "Bug report",
      state: "open",
      html_url: "https://github.com/owner/repo/issues/10",
      milestone: {
        title: "v2.0.0 Android",
        due_on: "2025-12-01T00:00:00Z",
      },
    },
    repository: {
      full_name: "owner/repo",
    },
  };

  it("should process a valid PR and create a new MobileRelease when none exists", async () => {
    const app = buildApp();

    const response = await app.inject({
      method: "POST",
      url: "/webhooks/github",
      payload: validPRPayload,
    });

    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.body);
    expect(body.processed).toBe(true);
    expect(mobileReleaseRepository.save).toHaveBeenCalledOnce();
    expect(releaseItemRepository.upsert).toHaveBeenCalledOnce();
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
    const app = buildApp();

    const response = await app.inject({
      method: "POST",
      url: "/webhooks/github",
      payload: validPRPayload,
    });

    expect(response.statusCode).toBe(200);
    expect(mobileReleaseRepository.save).not.toHaveBeenCalled();
    expect(releaseItemRepository.upsert).toHaveBeenCalledOnce();
  });

  it("should process a valid issue with a valid milestone", async () => {
    const app = buildApp();

    const response = await app.inject({
      method: "POST",
      url: "/webhooks/github",
      payload: validIssuePayload,
    });

    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.body);
    expect(body.processed).toBe(true);
    expect(releaseItemRepository.upsert).toHaveBeenCalled();
  });

  it("should skip items with no milestone", async () => {
    const app = buildApp();
    const payload = {
      ...validPRPayload,
      pull_request: {
        ...validPRPayload.pull_request,
        milestone: null,
      },
    };

    const response = await app.inject({
      method: "POST",
      url: "/webhooks/github",
      payload,
    });

    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.body);
    expect(body.processed).toBe(false);
    expect(body.reason).toBeDefined();
    expect(mobileReleaseRepository.save).not.toHaveBeenCalled();
    expect(releaseItemRepository.upsert).not.toHaveBeenCalled();
  });

  it("should skip items with an invalid milestone (missing platform)", async () => {
    const app = buildApp();
    const payload = {
      ...validPRPayload,
      pull_request: {
        ...validPRPayload.pull_request,
        milestone: { title: "v1.2.0", due_on: null },
      },
    };

    const response = await app.inject({
      method: "POST",
      url: "/webhooks/github",
      payload,
    });

    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.body);
    expect(body.processed).toBe(false);
    expect(mobileReleaseRepository.save).not.toHaveBeenCalled();
    expect(releaseItemRepository.upsert).not.toHaveBeenCalled();
  });

  it("should ignore events without issue or PR", async () => {
    const app = buildApp();
    const payload = {
      action: "created",
      repository: { full_name: "owner/repo" },
    };

    const response = await app.inject({
      method: "POST",
      url: "/webhooks/github",
      payload,
    });

    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.body);
    expect(body.processed).toBe(false);
    expect(body.reason).toContain("does not contain");
    expect(releaseItemRepository.upsert).not.toHaveBeenCalled();
  });

  it("should return 400 for invalid payload (missing repository)", async () => {
    const app = buildApp();
    const payload = {
      action: "opened",
      pull_request: {
        number: 42,
        title: "Fix login bug",
        state: "open",
        html_url: "https://github.com/owner/repo/pull/42",
      },
    };

    const response = await app.inject({
      method: "POST",
      url: "/webhooks/github",
      payload,
    });

    expect(response.statusCode).toBe(400);
  });

  it("should return 400 for invalid payload (missing action)", async () => {
    const app = buildApp();
    const payload = {
      repository: {
        full_name: "owner/repo",
      },
      pull_request: {
        number: 42,
        title: "Fix login bug",
        state: "open",
        html_url: "https://github.com/owner/repo/pull/42",
      },
    };

    const response = await app.inject({
      method: "POST",
      url: "/webhooks/github",
      payload,
    });

    expect(response.statusCode).toBe(400);
    const body = JSON.parse(response.body);
    expect(body.message).toBe("Validation Error");
  });

  it("should return 400 for invalid payload (malformed repository)", async () => {
    const app = buildApp();
    const payload = {
      action: "opened",
      repository: {},
      pull_request: {
        number: 42,
        title: "Fix login bug",
        state: "open",
        html_url: "https://github.com/owner/repo/pull/42",
      },
    };

    const response = await app.inject({
      method: "POST",
      url: "/webhooks/github",
      payload,
    });

    expect(response.statusCode).toBe(400);
  });

  it("should return 400 for invalid payload (malformed pull_request - missing number)", async () => {
    const app = buildApp();
    const payload = {
      action: "opened",
      repository: {
        full_name: "owner/repo",
      },
      pull_request: {
        title: "Fix login bug",
        state: "open",
        html_url: "https://github.com/owner/repo/pull/42",
      },
    };

    const response = await app.inject({
      method: "POST",
      url: "/webhooks/github",
      payload,
    });

    expect(response.statusCode).toBe(400);
  });

  it("should return 400 for invalid payload (malformed pull_request - invalid html_url)", async () => {
    const app = buildApp();
    const payload = {
      action: "opened",
      repository: {
        full_name: "owner/repo",
      },
      pull_request: {
        number: 42,
        title: "Fix login bug",
        state: "open",
        html_url: "not-a-url",
      },
    };

    const response = await app.inject({
      method: "POST",
      url: "/webhooks/github",
      payload,
    });

    expect(response.statusCode).toBe(400);
  });

  it("should return 400 for empty payload", async () => {
    const app = buildApp();
    const payload = {};

    const response = await app.inject({
      method: "POST",
      url: "/webhooks/github",
      payload,
    });

    expect(response.statusCode).toBe(400);
  });
});
