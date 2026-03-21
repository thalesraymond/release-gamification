import { IIdGenerator } from "@release-gamification/domain/src/index.js";

export class CryptoIdGenerator implements IIdGenerator {
  generate(): string {
    return crypto.randomUUID();
  }
}
