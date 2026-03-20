import MobilePlatform from "./MobilePlatform.js";
import ReleaseItemType from "./ReleaseItemType.js";

export default class ReleaseItem {
  constructor(
    public readonly id: string,
    public readonly repo: string,
    public readonly number: number,
    public readonly title: string,
    public readonly state: string,
    public readonly type: ReleaseItemType,
    public readonly milestoneTitle: string,
    public readonly version: string,
    public readonly platform: MobilePlatform,
    public readonly url: string,
  ) {}
}
