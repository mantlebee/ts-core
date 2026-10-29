# `delegates`

Wrappers around a function that **control how or when it runs**.

## What's in here

- **`abortable-delegate/`** — `IAbortableDelegate` / `AbortableDelegate`: the
  latest call wins. Each `call(...args)` aborts the running call, whose
  `AbortSignal` is aborted and whose promise rejects with `AbortedException`
  at once; the result of a superseded function is discarded when it settles.
  `abort()` aborts the running call, `isRunning` tells whether one is running,
  `isAbortedException` tells a superseded call from a failure.
- **`debounced-delegate/`** — `IDebouncedDelegate` / `DebouncedDelegate`:
  collapses bursts of calls into one. Each `call(...args)` restarts a timer; the
  wrapped function runs once the calls stop for the configured delay, with the
  arguments of the last call. `abort()` cancels a scheduled run, `isPending`
  tells whether one is scheduled.
