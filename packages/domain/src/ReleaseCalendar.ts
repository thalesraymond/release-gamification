import MobileRelease from "./MobileRelease.js";

export default class ReleaseCalendar {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly mobileReleases: MobileRelease[],
  ) {}
}
