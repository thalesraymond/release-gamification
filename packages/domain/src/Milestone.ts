import MobilePlatform from "./MobilePlatform.js";

const PLATFORM_KEYWORDS: Record<string, MobilePlatform> = {
  ios: MobilePlatform.IOS,
  iphone: MobilePlatform.IOS,
  ipad: MobilePlatform.IOS,
  android: MobilePlatform.ANDROID,
};

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

    const platform =
      Object.entries(PLATFORM_KEYWORDS).find(([keyword]) =>
        lowerTitle.includes(keyword),
      )?.[1] ?? null;

    if (!platform) {
      return null;
    }

    return new Milestone(title, versionMatch[1], platform);
  }
}
