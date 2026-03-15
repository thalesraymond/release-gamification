import {
  ReleaseCalendar,
  IReleaseCalendarRepository,
} from "@release-gamification/domain/src/index.js";
import { BaseUseCase } from "./BaseUseCase.js";

export interface GetReleaseCalendarInput {
  id: string;
}

export class GetReleaseCalendar extends BaseUseCase<
  GetReleaseCalendarInput,
  ReleaseCalendar
> {
  constructor(private readonly repository: IReleaseCalendarRepository) {
    super();
  }

  async execute(input: GetReleaseCalendarInput): Promise<ReleaseCalendar> {
    const calendar = await this.repository.findById(input.id);
    if (!calendar) {
      throw new Error(`Release calendar with ID "${input.id}" not found`);
    }

    return calendar;
  }
}
