import DeliveryItem from "./DeliveryItem.js";
import MobilePlatform from "./MobilePlatform.js";

export default class MobileRelease {
  constructor(
    public readonly id: string,
    public readonly version: string,
    public readonly releaseDate: Date,
    public readonly platform: MobilePlatform,
    private readonly deliveryItems: DeliveryItem[],
  ) {}

  getDeliveryItems(): DeliveryItem[] {
    return [...this.deliveryItems];
  }

  addDeliveryItem(deliveryItem: DeliveryItem): void {
    this.deliveryItems.push(deliveryItem);
  }

  addDeliveryItems(deliveryItems: DeliveryItem[]): void {
    this.deliveryItems.push(...deliveryItems);
  }
}
