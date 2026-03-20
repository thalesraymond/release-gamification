import ReleaseItem from "./ReleaseItem.js";

export interface IReleaseItemRepository {
  upsert(entity: ReleaseItem): Promise<void>;
  findByRepoAndNumber(
    repo: string,
    number: number,
  ): Promise<ReleaseItem | null>;
  findAll(): Promise<ReleaseItem[]>;
}
