## 2025-05-28 - Missing Webhook Signature Validation

**Vulnerability:** The GitHub webhooks endpoint (`apps/apis/src/routes/github-webhooks.ts`) lacked signature verification, making it vulnerable to unauthorized, forged requests triggering webhook actions.
**Learning:** External system data ingestion reliant on webhooks must inherently verify source authenticity. Due to restricted network access, parsing raw request bodies in Fastify required adding a custom content-type parser `application/json` as a buffer, specific to the route scope, to reliably compute the HMAC for validation.
**Prevention:** All webhook endpoints interacting with external services (e.g., GitHub, ServiceNow) must implement mandatory payload signature verification (using `crypto.timingSafeEqual` or equivalent) as the first step in route processing. Ensure raw request bodies are preserved for accurate HMAC computation.

## 2025-05-28 - Missing Global Rate Limiting

**Vulnerability:** The Fastify API application did not have a global rate limiter configured, making it susceptible to brute-force attacks on sensitive endpoints or denial-of-service (DoS) from high-volume traffic.
**Learning:** Fastify applications should implement rate limiting early in the request lifecycle to protect all registered routes by default.
**Prevention:** Always register `@fastify/rate-limit` as a standard security plugin alongside `helmet` and `cors` in `apps/apis/src/app.ts`.

## 2026-04-04 - [Log Sanitization]

**Vulnerability:** MongoDB connection string (URI) was being logged to the console during in-memory database initialization.
**Learning:** In the infrastructure layer, connection strings and URIs must not be logged, even for test databases, to prevent accidental information exposure.
**Prevention:** Sanitize logs by omitting sensitive connection details.
