import MobileRelease from "./MobileRelease.js";
import MobilePlatform from "./MobilePlatform.js";

export interface IMobileReleaseRepository {
  save(entity: MobileRelease): Promise<void>;
  findByVersionAndPlatform(
    version: string,
    platform: MobilePlatform,
  ): Promise<MobileRelease | null>;
}
