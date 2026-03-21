import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { createHmac, timingSafeEqual } from "node:crypto";
import { ProcessGithubWebhookItemUseCase } from "@release-gamification/use-cases/src/ProcessGithubWebhookItem.js";
import {
  IReleaseItemRepository,
  IMobileReleaseRepository,
  ReleaseItemType,
} from "@release-gamification/domain/src/index.js";

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

const ErrorSchema = z.object({
  statusCode: z.number(),
  error: z.string(),
  message: z.string(),
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
  githubWebhookSecret: string,
): FastifyPluginAsync {
  return async (fastify: FastifyInstance) => {
    const app = fastify.withTypeProvider<ZodTypeProvider>();

    fastify.addContentTypeParser(
      "application/json",
      { parseAs: "buffer" },
      (request, body, done) => {
        try {
          const rawBody = body as Buffer;
          (request as any).rawBody = rawBody;
          const json = JSON.parse(rawBody.toString("utf8"));
          done(null, json);
        } catch (err: any) {
          err.statusCode = 400;
          done(err, undefined);
        }
      },
    );

    app.post(
      "/webhooks/github",
      {
        schema: GithubWebhookSchema,
        preHandler: async (request, reply) => {
          const signature = request.headers["x-hub-signature-256"];
          if (!signature || typeof signature !== "string") {
            return reply.status(401).send({
              statusCode: 401,
              error: "Unauthorized",
              message: "Missing GitHub signature",
            });
          }

          const rawBody = (request as any).rawBody;
          if (!rawBody) {
            return reply.status(401).send({
              statusCode: 401,
              error: "Unauthorized",
              message: "Missing raw body",
            });
          }

          const hmac = createHmac("sha256", githubWebhookSecret);
          const digest = Buffer.from(
            "sha256=" + hmac.update(rawBody).digest("hex"),
            "utf8",
          );
          const checksum = Buffer.from(signature, "utf8");

          if (
            digest.length !== checksum.length ||
            !timingSafeEqual(digest, checksum)
          ) {
            return reply.status(401).send({
              statusCode: 401,
              error: "Unauthorized",
              message: "Invalid GitHub signature",
            });
          }
        },
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
