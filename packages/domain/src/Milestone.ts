import MobilePlatform from "./MobilePlatform.js";

const PLATFORM_MATCHERS = [
  { keyword: "ios", platform: MobilePlatform.IOS },
  { keyword: "iphone", platform: MobilePlatform.IOS },
  { keyword: "ipad", platform: MobilePlatform.IOS },
  { keyword: "android", platform: MobilePlatform.ANDROID },
];

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
      PLATFORM_MATCHERS.find(({ keyword }) => lowerTitle.includes(keyword))
        ?.platform ?? null;

    if (!platform) {
      return null;
    }

    return new Milestone(title, versionMatch[1], platform);
  }
}
