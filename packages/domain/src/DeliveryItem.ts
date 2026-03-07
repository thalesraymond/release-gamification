import IDeliveryDetails from "./IDeliveryDetails.js";
import { Squad } from "./Squad.js";

export default class DeliveryItem {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string,
    public readonly squad: Squad,
    public readonly deliveryDetails: IDeliveryDetails[],
  ) {}
}
