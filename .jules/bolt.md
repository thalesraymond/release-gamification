## 2024-10-25 - Webhook Parsing Allocations

**Learning:** During GitHub webhook parsing in `Milestone.parse`, using an array `.find()` coupled with `title.toLowerCase()` creates significant memory allocation overhead for incoming webhook bursts, as an entire string copy is created on every pass.
**Action:** Always pre-compile regular expressions and prefer them over string copying and array iterations in high-throughput parsing functions, significantly reducing V8 garbage collection overhead.

## 2024-05-24 - [Polymorphic Serialization Performance]

**Learning:** Checking object types sequentially using `instanceof` during large array iterations (like mapping nested documents for database insertion) introduces significant V8 prototype chain lookup overhead.
**Action:** Replace `instanceof` checks with a polymorphic `toJSON()` implementation on the domain models to eliminate prototype lookups and cleanly encapsulate serialization logic.
