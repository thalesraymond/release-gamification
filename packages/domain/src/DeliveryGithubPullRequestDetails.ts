import IDeliveryDetails from "./IDeliveryDetails.js";

export default class DeliveryGithubPullRequestDetails implements IDeliveryDetails {
  constructor(public readonly changesCount: number) {}
}
