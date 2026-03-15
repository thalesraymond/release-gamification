import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { CreateReleaseCalendar } from "@release-gamification/use-cases/src/CreateReleaseCalendar.js";
import { IReleaseCalendarRepository } from "@release-gamification/domain/src/index.js";

const CreateReleaseCalendarSchema = {
  body: z.object({
    name: z.string().min(1),
  }),
  response: {
    201: z.object({
      id: z.string().uuid(),
      name: z.string(),
    }),
    400: z.object({
      statusCode: z.number(),
      error: z.string(),
      message: z.string(),
      details: z.any().optional(),
    }),
    409: z.object({
      statusCode: z.number(),
      error: z.string(),
      message: z.string(),
    }),
  },
};

export function createReleaseCalendarRoutes(
  repository: IReleaseCalendarRepository,
): FastifyPluginAsync {
  return async (fastify: FastifyInstance) => {
    const app = fastify.withTypeProvider<ZodTypeProvider>();

    app.post(
      "/release-calendars",
      {
        schema: CreateReleaseCalendarSchema,
      },
      async (request, reply) => {
        const useCase = new CreateReleaseCalendar(repository);
        try {
          const calendar = await useCase.execute(request.body);
          return reply.status(201).send({
            id: calendar.id,
            name: calendar.name,
          });
        } catch (error) {
          if (
            error instanceof Error &&
            error.message.includes("already exists")
          ) {
            return reply.status(409).send({
              statusCode: 409,
              error: "Conflict",
              message: error.message,
            });
          }
          throw error;
        }
      },
    );
  };
}
