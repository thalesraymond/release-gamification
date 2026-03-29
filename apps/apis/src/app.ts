import fastify, { FastifyError, FastifyInstance } from "fastify";
import helmet from "@fastify/helmet";
import cors from "@fastify/cors";
import sensible from "@fastify/sensible";
import rateLimit from "@fastify/rate-limit";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";

import {
  IReleaseCalendarRepository,
  IReleaseItemRepository,
  IMobileReleaseRepository,
} from "@release-gamification/domain/src/index.js";
import { createReleaseCalendarRoutes } from "./routes/release-calendars.js";
import { createGithubWebhookRoutes } from "./routes/github-webhooks.js";

export interface AppConfig {
  releaseCalendarRepository: IReleaseCalendarRepository;
  releaseItemRepository: IReleaseItemRepository;
  mobileReleaseRepository: IMobileReleaseRepository;
}

export function createApp(config: AppConfig): FastifyInstance {
  const app = fastify({
    logger: true,
    trustProxy: true,
  }).withTypeProvider<ZodTypeProvider>();

  // Register Zod compiler
  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  // Register standard plugins
  app.register(helmet);
  app.register(cors);
  app.register(sensible);

  // 🛡️ SECURITY: Add global rate limiting to protect against DoS and brute-force attacks
  app.register(rateLimit, {
    max: process.env.RATE_LIMIT_MAX
      ? parseInt(process.env.RATE_LIMIT_MAX, 10)
      : 100,
    timeWindow: process.env.RATE_LIMIT_TIME_WINDOW || "1 minute",
  });

  // Register Swagger
  app.register(swagger, {
    openapi: {
      info: {
        title: "Release Gamification API",
        description: "API for managing releases and calendars",
        version: "1.0.0",
      },
    },
    transform: jsonSchemaTransform,
  });

  app.register(swaggerUi, {
    routePrefix: "/docs",
  });

  // Register Routes
  app.register(createReleaseCalendarRoutes(config.releaseCalendarRepository));
  app.register(
    createGithubWebhookRoutes(
      config.releaseItemRepository,
      config.mobileReleaseRepository,
      process.env.GITHUB_WEBHOOK_SECRET,
    ),
  );

  // Default Error Handler
  app.setErrorHandler((error: FastifyError, request, reply) => {
    if (error.validation) {
      return reply.status(400).send({
        statusCode: 400,
        error: "Bad Request",
        message: "Validation Error",
        details: error.validation,
      });
    }

    request.log.error(error);
    return reply.status(500).send({
      statusCode: 500,
      error: "Internal Server Error",
      message: "An unexpected error occurred",
    });
  });

  // 404 Handler
  app.setNotFoundHandler((request, reply) => {
    reply.status(404).send({
      statusCode: 404,
      error: "Not Found",
      message: "Resource not found",
    });
  });

  return app as unknown as FastifyInstance;
}
