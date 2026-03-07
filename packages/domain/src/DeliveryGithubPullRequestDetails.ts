import IDeliveryDetails from "./IDeliveryDetails.js";

export default class DeliveryGithubPullRequestDetails implements IDeliveryDetails {
  constructor(
    public readonly number: number,
    public readonly url: string,
    public readonly title: string,
    public readonly body: string,
    public readonly changesCount: number,
  ) {}

  getTitle(): string {
    return this.title;
  }

  getDescription(): string {
    return this.body;
  }

  getType(): string {
    return "github_pull_request";
  }
}
