# `cache`

**Key/value caches.** `ICache<TValue, TKey>` exposes `exists`, `read`, `write`
and `clear` per key; `read` returns `null` for missing keys, while falsy values
(`0`, `""`, `false`) are cached like any other.

## What's in here

- **`interfaces.ts`** — `ICache`.
- **`in-memory-cache/`** — `InMemoryCache`: values kept in a `Map`.
- **`in-memory-expirable-cache/`** — `InMemoryExpirableCache`: values expire
  after a number of seconds from their last write (`0` = never); expired values
  are removed lazily when accessed. It stores the values in any `ICache`,
  default an `InMemoryCache`.
