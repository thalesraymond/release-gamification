## 2024-10-25 - Webhook Parsing Allocations

**Learning:** During GitHub webhook parsing in `Milestone.parse`, using an array `.find()` coupled with `title.toLowerCase()` creates significant memory allocation overhead for incoming webhook bursts, as an entire string copy is created on every pass.
**Action:** Always pre-compile regular expressions and prefer them over string copying and array iterations in high-throughput parsing functions, significantly reducing V8 garbage collection overhead.

## 2024-10-25 - MongoDB Missing Indexes for Domain Identity and Queries

**Learning:** MongoDB missing indexes for custom domain entity fields (like `id`) and common query parameters (e.g. `version/platform` for `mobile_releases` and `repo/number` during `upsert` of `release_items`) causes slow O(N) collection scans rather than O(1) index lookups.
**Action:** Always verify indexes are present for custom identity fields (`id`), unique constraints, and frequent lookup fields, explicitly defining them in database initialization if auto-creation is not managed via an ORM or infrastructure as code.
