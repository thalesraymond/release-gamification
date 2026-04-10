export default interface IDeliveryDetails {
  getTitle(): string;
  getDescription(): string;
  getType(): string;
  toJSON(): Record<string, any>;
}
