import {
  ReleaseCalendar,
  IReleaseCalendarRepository,
} from "@release-gamification/domain/src/index.js";
import { BaseUseCase } from "./BaseUseCase.js";

export interface UpdateReleaseCalendarInput {
  id: string;
  name: string;
}

export class UpdateReleaseCalendar extends BaseUseCase<
  UpdateReleaseCalendarInput,
  ReleaseCalendar
> {
  constructor(private readonly repository: IReleaseCalendarRepository) {
    super();
  }

  async execute(input: UpdateReleaseCalendarInput): Promise<ReleaseCalendar> {
    const calendar = await this.repository.findById(input.id);
    if (!calendar) {
      throw new Error(`Release calendar with ID "${input.id}" not found`);
    }

    // Check if another calendar already has the new name
    if (input.name !== calendar.name) {
      const existingWithName = await this.repository.findByName(input.name);
      if (existingWithName) {
        throw new Error(
          `Release calendar with name "${input.name}" already exists`,
        );
      }
    }

    const updatedCalendar = new ReleaseCalendar(
      calendar.id,
      input.name,
      calendar.mobileReleases,
    );

    await this.repository.save(updatedCalendar);

    return updatedCalendar;
  }
}
