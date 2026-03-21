## 2025-05-28 - Missing Webhook Signature Validation

**Vulnerability:** The GitHub webhooks endpoint (`apps/apis/src/routes/github-webhooks.ts`) lacked signature verification, making it vulnerable to unauthorized, forged requests triggering webhook actions.
**Learning:** External system data ingestion reliant on webhooks must inherently verify source authenticity. Due to restricted network access, parsing raw request bodies in Fastify required adding a custom content-type parser `application/json` as a buffer, specific to the route scope, to reliably compute the HMAC for validation.
**Prevention:** All webhook endpoints interacting with external services (e.g., GitHub, ServiceNow) must implement mandatory payload signature verification (using `crypto.timingSafeEqual` or equivalent) as the first step in route processing. Ensure raw request bodies are preserved for accurate HMAC computation.
