# `locks`

Primitives that **coordinate async work on a shared resource**. Unlike
`delegates/`, which wrap one function, a lock is shared by many callers.

## What's in here

- **`async-lock/`** — `IAsyncLock` / `AsyncLock`: exclusive, non-reentrant,
  FIFO lock. `run(fn)` runs `fn` once every function enqueued before it has
  settled, and resolves or rejects with its outcome; a failure does not block
  the next function. `isLocked` tells whether a function is running,
  `pendingCount` how many are waiting.
