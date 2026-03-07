import IDeliveryDetails from "./IDeliveryDetails.js";

export default class DeliveryGithubIssueDetails implements IDeliveryDetails {
  constructor(
    public readonly number: number,
    public readonly url: string,
    public readonly title: string,
    public readonly body: string,
  ) {}

  getTitle(): string {
    return this.title;
  }

  getDescription(): string {
    return this.body;
  }

  getType(): string {
    return "github_issue";
  }
}
