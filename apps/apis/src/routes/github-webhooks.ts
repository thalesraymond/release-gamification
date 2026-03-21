import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { ProcessGithubWebhookItemUseCase } from "@release-gamification/use-cases/src/ProcessGithubWebhookItem.js";
import {
  IReleaseItemRepository,
  IMobileReleaseRepository,
  ReleaseItemType,
} from "@release-gamification/domain/src/index.js";
import { ErrorSchema } from "../schemas/error.js";

const MilestoneSchema = z
  .object({
    title: z.string(),
    due_on: z.string().nullable().optional(),
  })
  .nullable()
  .optional();

const GithubItemSchema = z.object({
  number: z.number(),
  title: z.string(),
  state: z.string(),
  html_url: z.string().url(),
  milestone: MilestoneSchema,
});

const GithubWebhookPayloadSchema = z.object({
  action: z.string(),
  issue: GithubItemSchema.optional(),
  pull_request: GithubItemSchema.optional(),
  repository: z.object({
    full_name: z.string(),
  }),
});

const WebhookResponseSchema = z.object({
  processed: z.boolean(),
  reason: z.string().optional(),
});

const GithubWebhookSchema = {
  body: GithubWebhookPayloadSchema,
  response: {
    200: WebhookResponseSchema,
    400: ErrorSchema,
  },
};

export function createGithubWebhookRoutes(
  releaseItemRepository: IReleaseItemRepository,
  mobileReleaseRepository: IMobileReleaseRepository,
): FastifyPluginAsync {
  return async (fastify: FastifyInstance) => {
    const app = fastify.withTypeProvider<ZodTypeProvider>();

    app.post(
      "/webhooks/github",
      {
        schema: GithubWebhookSchema,
      },
      async (request, reply) => {
        const payload = request.body;
        const item = payload.pull_request ?? payload.issue;

        if (!item) {
          return reply.status(200).send({
            processed: false,
            reason: "Event does not contain an issue or pull request",
          });
        }

        const type = payload.pull_request
          ? ReleaseItemType.PULL_REQUEST
          : ReleaseItemType.ISSUE;

        const milestoneDueDate = item.milestone?.due_on
          ? new Date(item.milestone.due_on)
          : null;

        const useCase = new ProcessGithubWebhookItemUseCase(
          releaseItemRepository,
          mobileReleaseRepository,
        );
        const result = await useCase.execute({
          action: payload.action,
          number: item.number,
          title: item.title,
          state: item.state,
          type,
          url: item.html_url,
          repo: payload.repository.full_name,
          milestoneTitle: item.milestone?.title ?? null,
          milestoneDueDate,
        });

        return reply.status(200).send({
          processed: result.processed,
          reason: result.reason,
        });
      },
    );
  };
}
