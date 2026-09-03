# `common/utils/promises`

The **deferred promise** abstraction: a promise whose settlement is controlled
from the outside, so a producer and a consumer can rendez-vous without holding a
reference to each other.

## What's in here

- **`interfaces.ts`** — `IDeferred<TValue>`: `wait()` returns the promise;
  `resolve(value)` / `reject(reason)` settle it later.
- **[`keyed-deferred/`](./keyed-deferred)** — `KeyedDeferred`, an implementation
  that registers the pending promise in a process-wide `Map` under a key, so any
  instance created with the same key can settle it. Supports an optional
  auto-reject timeout.
