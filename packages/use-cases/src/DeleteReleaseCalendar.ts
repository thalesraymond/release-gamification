import { IReleaseCalendarRepository } from "@release-gamification/domain/src/index.js";
import { BaseUseCase } from "./BaseUseCase.js";

export interface DeleteReleaseCalendarInput {
  id: string;
}

export class DeleteReleaseCalendar extends BaseUseCase<
  DeleteReleaseCalendarInput,
  void
> {
  constructor(private readonly repository: IReleaseCalendarRepository) {
    super();
  }

  async execute(input: DeleteReleaseCalendarInput): Promise<void> {
    const calendar = await this.repository.findById(input.id);
    if (!calendar) {
      throw new Error(`Release calendar with ID "${input.id}" not found`);
    }

    await this.repository.delete(input.id);
  }
}
