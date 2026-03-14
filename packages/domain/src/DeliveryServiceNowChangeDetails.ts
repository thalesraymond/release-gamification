import IDeliveryDetails from "./IDeliveryDetails.js";

export default class DeliveryServiceNowChangeDetails implements IDeliveryDetails {
  constructor(
    public readonly changeId: string,
    public readonly changeNumber: string,
    public readonly shortDescription: string,
    public readonly description: string,
  ) {}

  getTitle(): string {
    return this.shortDescription;
  }
  getDescription(): string {
    return this.description;
  }
  getType(): string {
    return "servicenow_change";
  }
}
