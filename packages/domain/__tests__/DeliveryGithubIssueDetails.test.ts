import { describe, it, expect } from "vitest";
import DeliveryGithubIssueDetails from "../src/DeliveryGithubIssueDetails.js";

describe("DeliveryGithubIssueDetails", () => {
  it("should create an instance correctly and retain its properties", () => {
    const issue = new DeliveryGithubIssueDetails(
      123,
      "https://github.com/owner/repo/issues/123",
      "Bug in login",
      "When clicking login, it crashes.",
    );

    expect(issue.number).toBe(123);
    expect(issue.url).toBe("https://github.com/owner/repo/issues/123");
    expect(issue.title).toBe("Bug in login");
    expect(issue.body).toBe("When clicking login, it crashes.");
  });

  it("should return the title when getTitle is called", () => {
    const issue = new DeliveryGithubIssueDetails(123, "url", "title", "body");
    expect(issue.getTitle()).toBe("title");
  });

  it("should return the body when getDescription is called", () => {
    const issue = new DeliveryGithubIssueDetails(123, "url", "title", "body");
    expect(issue.getDescription()).toBe("body");
  });

  it("should return 'github_issue' when getType is called", () => {
    const issue = new DeliveryGithubIssueDetails(123, "url", "title", "body");
    expect(issue.getType()).toBe("github_issue");
  });
});
