import IDeliveryDetails from "./IDeliveryDetails.js";
import { Squad } from "./Squad.js";

export default class DeliveryItem {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string,
    public readonly squad: Squad,
    private readonly deliveryDetails: IDeliveryDetails[],
  ) {}

  getDeliveryDetails(): IDeliveryDetails[] {
    return [...this.deliveryDetails];
  }

  addDeliveryDetails(deliveryDetails: IDeliveryDetails): void {
    this.deliveryDetails.push(deliveryDetails);
  }

  getDeliveryDetailsByType(type: string): IDeliveryDetails[] {
    return this.deliveryDetails.filter((detail) => detail.getType() === type);
  }
}
