import {
  ReleaseItem,
  ReleaseItemType,
  Milestone,
  MobileRelease,
  IReleaseItemRepository,
  IMobileReleaseRepository,
} from "@release-gamification/domain/src/index.js";
import { BaseUseCase } from "./BaseUseCase.js";

export interface ProcessGithubWebhookItemInput {
  action: string;
  number: number;
  title: string;
  state: string;
  type: ReleaseItemType;
  url: string;
  repo: string;
  milestoneTitle: string | null;
  milestoneDueDate: Date | null;
}

export interface ProcessGithubWebhookItemOutput {
  processed: boolean;
  releaseItem: ReleaseItem | null;
  mobileRelease: MobileRelease | null;
  reason?: string;
}

export class ProcessGithubWebhookItemUseCase extends BaseUseCase<
  ProcessGithubWebhookItemInput,
  ProcessGithubWebhookItemOutput
> {
  constructor(
    private readonly releaseItemRepository: IReleaseItemRepository,
    private readonly mobileReleaseRepository: IMobileReleaseRepository,
  ) {
    super();
  }

  async execute(
    input: ProcessGithubWebhookItemInput,
  ): Promise<ProcessGithubWebhookItemOutput> {
    if (!input.milestoneTitle) {
      return {
        processed: false,
        releaseItem: null,
        mobileRelease: null,
        reason: "No milestone associated",
      };
    }

    const milestone = Milestone.parse(input.milestoneTitle);
    if (!milestone) {
      return {
        processed: false,
        releaseItem: null,
        mobileRelease: null,
        reason: `Invalid milestone: "${input.milestoneTitle}" (must contain version and platform)`,
      };
    }

    // Find or create the MobileRelease for this version + platform
    let mobileRelease =
      await this.mobileReleaseRepository.findByVersionAndPlatform(
        milestone.version,
        milestone.platform,
      );

    if (!mobileRelease) {
      mobileRelease = new MobileRelease(
        crypto.randomUUID(),
        milestone.version,
        input.milestoneDueDate ?? new Date(),
        milestone.platform,
        [],
      );
      await this.mobileReleaseRepository.save(mobileRelease);
    }

    const releaseItem = new ReleaseItem(
      crypto.randomUUID(),
      input.repo,
      input.number,
      input.title,
      input.state,
      input.type,
      milestone.title,
      milestone.version,
      milestone.platform,
      input.url,
    );

    await this.releaseItemRepository.upsert(releaseItem);

    return {
      processed: true,
      releaseItem,
      mobileRelease,
    };
  }
}
