import MobilePlatform from "./MobilePlatform.js";

// ⚡ Bolt Optimization:
// Pre-compiled regular expressions prevent the regex engine from parsing
// and recompiling the pattern on every webhook invocation.
const VERSION_REGEX = /v?(\d{1,10}\.\d{1,10}(?:\.\d{1,10})?)/i;
const PLATFORM_REGEX = /(ios|iphone|ipad|android)/i;

export default class Milestone {
  private constructor(
    public readonly title: string,
    public readonly version: string,
    public readonly platform: MobilePlatform,
  ) {}

  static parse(title: string): Milestone | null {
    const versionMatch = title.match(VERSION_REGEX);
    if (!versionMatch) {
      return null;
    }

    // ⚡ Bolt Optimization:
    // Replaced array iteration (`PLATFORM_MATCHERS.find`) and `title.toLowerCase()`
    // with a single pre-compiled regular expression.
    // Impact: Avoids allocating a new lowercased string of the full title
    // and eliminates O(n) array iteration, reducing garbage collection
    // pressure during high-volume webhook bursts.
    const platformMatch = title.match(PLATFORM_REGEX);
    if (!platformMatch) {
      return null;
    }

    const matchedKeyword = platformMatch[1].toLowerCase();
    const platform = matchedKeyword === "android" ? MobilePlatform.ANDROID : MobilePlatform.IOS;

    return new Milestone(title, versionMatch[1], platform);
  }
}
