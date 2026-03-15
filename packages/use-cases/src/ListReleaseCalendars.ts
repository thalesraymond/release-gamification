import {
  ReleaseCalendar,
  IReleaseCalendarRepository,
} from "@release-gamification/domain/src/index.js";
import { BaseUseCase } from "./BaseUseCase.js";

export class ListReleaseCalendars extends BaseUseCase<void, ReleaseCalendar[]> {
  constructor(private readonly repository: IReleaseCalendarRepository) {
    super();
  }

  async execute(): Promise<ReleaseCalendar[]> {
    return this.repository.findAll();
  }
}
