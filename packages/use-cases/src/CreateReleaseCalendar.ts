import {
  ReleaseCalendar,
  IReleaseCalendarRepository,
} from "@release-gamification/domain/src/index.js";
import { BaseUseCase } from "./BaseUseCase.js";

export interface CreateReleaseCalendarInput {
  name: string;
}

export class CreateReleaseCalendar extends BaseUseCase<
  CreateReleaseCalendarInput,
  ReleaseCalendar
> {
  constructor(private readonly repository: IReleaseCalendarRepository) {
    super();
  }

  async execute(input: CreateReleaseCalendarInput): Promise<ReleaseCalendar> {
    const existing = await this.repository.findByName(input.name);
    if (existing) {
      throw new Error(
        `Release calendar with name "${input.name}" already exists`,
      );
    }

    const calendar = new ReleaseCalendar(crypto.randomUUID(), input.name, []);

    await this.repository.save(calendar);

    return calendar;
  }
}
