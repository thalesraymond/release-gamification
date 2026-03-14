import { describe, it, expect } from "vitest";
import DeliveryGithubPullRequestDetails from "../src/DeliveryGithubPullRequestDetails.js";

describe("DeliveryGithubPullRequestDetails", () => {
  it("should create an instance correctly and retain its properties", () => {
    const pr = new DeliveryGithubPullRequestDetails(
      42,
      "https://github.com/owner/repo/pull/42",
      "Add login feature",
      "Implements the new login screen.",
      10,
    );

    expect(pr.number).toBe(42);
    expect(pr.url).toBe("https://github.com/owner/repo/pull/42");
    expect(pr.title).toBe("Add login feature");
    expect(pr.body).toBe("Implements the new login screen.");
    expect(pr.changesCount).toBe(10);
  });

  it("should return the title when getTitle is called", () => {
    const pr = new DeliveryGithubPullRequestDetails(
      1,
      "url",
      "title",
      "body",
      0,
    );
    expect(pr.getTitle()).toBe("title");
  });

  it("should return the body when getDescription is called", () => {
    const pr = new DeliveryGithubPullRequestDetails(
      1,
      "url",
      "title",
      "body",
      0,
    );
    expect(pr.getDescription()).toBe("body");
  });

  it("should return 'github_pull_request' when getType is called", () => {
    const pr = new DeliveryGithubPullRequestDetails(
      1,
      "url",
      "title",
      "body",
      0,
    );
    expect(pr.getType()).toBe("github_pull_request");
  });
});
