import { z } from "zod";

export const ErrorSchema = z.object({
  statusCode: z.number().int().gte(400).lt(600),
  error: z.string().min(1),
  message: z.string().min(1),
  details: z.array(z.any()).optional(),
});
