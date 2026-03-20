import MobilePlatform from "./MobilePlatform.js";

export default class Milestone {
  private constructor(
    public readonly title: string,
    public readonly version: string,
    public readonly platform: MobilePlatform,
  ) {}

  static parse(title: string): Milestone | null {
    const versionMatch = title.match(/v?(\d+\.\d+(?:\.\d+)?)/i);
    if (!versionMatch) {
      return null;
    }

    const lowerTitle = title.toLowerCase();
    let platform: MobilePlatform | null = null;

    if (
      lowerTitle.includes("ios") ||
      lowerTitle.includes("iphone") ||
      lowerTitle.includes("ipad")
    ) {
      platform = MobilePlatform.IOS;
    } else if (lowerTitle.includes("android")) {
      platform = MobilePlatform.ANDROID;
    }

    if (!platform) {
      return null;
    }

    return new Milestone(title, versionMatch[1], platform);
  }
}
