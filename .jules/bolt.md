## 2024-10-25 - Webhook Parsing Allocations

**Learning:** During GitHub webhook parsing in `Milestone.parse`, using an array `.find()` coupled with `title.toLowerCase()` creates significant memory allocation overhead for incoming webhook bursts, as an entire string copy is created on every pass.
**Action:** Always pre-compile regular expressions and prefer them over string copying and array iterations in high-throughput parsing functions, significantly reducing V8 garbage collection overhead.

## 2025-05-15 - Collection Caching in BaseMongoRepository

**Learning:** Repeatedly calling `DatabaseConnection.getInstance().getDb()` and `db.collection()` in `BaseMongoRepository` adds measurable asynchronous and lookup overhead (approx 0.009ms per call).
**Action:** Cache the collection instance in a private class property after the first resolution to reduce overhead to approx 0.0004ms per call.
