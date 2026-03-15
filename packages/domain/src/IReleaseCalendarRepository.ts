import ReleaseCalendar from "./ReleaseCalendar.js";
import { IBaseRepository } from "./IBaseRepository.js";

export interface IReleaseCalendarRepository extends IBaseRepository<ReleaseCalendar> {
  findByName(name: string): Promise<ReleaseCalendar | null>;
}
