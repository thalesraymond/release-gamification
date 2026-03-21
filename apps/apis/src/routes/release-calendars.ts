import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { CreateReleaseCalendar } from "@release-gamification/use-cases/src/CreateReleaseCalendar.js";
import { GetReleaseCalendar } from "@release-gamification/use-cases/src/GetReleaseCalendar.js";
import { ListReleaseCalendars } from "@release-gamification/use-cases/src/ListReleaseCalendars.js";
import { UpdateReleaseCalendar } from "@release-gamification/use-cases/src/UpdateReleaseCalendar.js";
import { DeleteReleaseCalendar } from "@release-gamification/use-cases/src/DeleteReleaseCalendar.js";
import { IReleaseCalendarRepository } from "@release-gamification/domain/src/index.js";
import { ErrorSchema } from "../schemas/error.js";

const ReleaseCalendarResponseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
});

const CreateReleaseCalendarSchema = {
  body: z.object({
    name: z.string().min(1),
  }),
  response: {
    201: ReleaseCalendarResponseSchema,
    400: ErrorSchema.extend({
      details: z.any().optional(),
    }),
    409: ErrorSchema,
  },
};

const ListReleaseCalendarsSchema = {
  response: {
    200: z.array(ReleaseCalendarResponseSchema),
  },
};

const GetReleaseCalendarSchema = {
  params: z.object({
    id: z.string().uuid(),
  }),
  response: {
    200: ReleaseCalendarResponseSchema,
    404: ErrorSchema,
  },
};

const UpdateReleaseCalendarSchema = {
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    name: z.string().min(1),
  }),
  response: {
    200: ReleaseCalendarResponseSchema,
    404: ErrorSchema,
    409: ErrorSchema,
  },
};

const DeleteReleaseCalendarSchema = {
  params: z.object({
    id: z.string().uuid(),
  }),
  response: {
    204: z.null(),
    404: ErrorSchema,
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

    app.get(
      "/release-calendars",
      {
        schema: ListReleaseCalendarsSchema,
      },
      async () => {
        const useCase = new ListReleaseCalendars(repository);
        const calendars = await useCase.execute();
        return calendars.map((c) => ({
          id: c.id,
          name: c.name,
        }));
      },
    );

    app.get(
      "/release-calendars/:id",
      {
        schema: GetReleaseCalendarSchema,
      },
      async (request, reply) => {
        const useCase = new GetReleaseCalendar(repository);
        try {
          const calendar = await useCase.execute({ id: request.params.id });
          return {
            id: calendar.id,
            name: calendar.name,
          };
        } catch (error) {
          if (error instanceof Error && error.message.includes("not found")) {
            return reply.status(404).send({
              statusCode: 404,
              error: "Not Found",
              message: error.message,
            });
          }
          throw error;
        }
      },
    );

    app.put(
      "/release-calendars/:id",
      {
        schema: UpdateReleaseCalendarSchema,
      },
      async (request, reply) => {
        const useCase = new UpdateReleaseCalendar(repository);
        try {
          const calendar = await useCase.execute({
            id: request.params.id,
            name: request.body.name,
          });
          return {
            id: calendar.id,
            name: calendar.name,
          };
        } catch (error) {
          if (error instanceof Error) {
            if (error.message.includes("not found")) {
              return reply.status(404).send({
                statusCode: 404,
                error: "Not Found",
                message: error.message,
              });
            }
            if (error.message.includes("already exists")) {
              return reply.status(409).send({
                statusCode: 409,
                error: "Conflict",
                message: error.message,
              });
            }
          }
          throw error;
        }
      },
    );

    app.delete(
      "/release-calendars/:id",
      {
        schema: DeleteReleaseCalendarSchema,
      },
      async (request, reply) => {
        const useCase = new DeleteReleaseCalendar(repository);
        try {
          await useCase.execute({ id: request.params.id });
          return reply.status(204).send(null);
        } catch (error) {
          if (error instanceof Error && error.message.includes("not found")) {
            return reply.status(404).send({
              statusCode: 404,
              error: "Not Found",
              message: error.message,
            });
          }
          throw error;
        }
      },
    );
  };
}
