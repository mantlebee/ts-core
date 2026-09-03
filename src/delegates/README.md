# `delegates`

Wrappers around a function that **control how or when it runs**.

## What's in here

- **`debounced-delegate/`** — `IDebouncedDelegate` / `DebouncedDelegate`:
  collapses bursts of calls into one. Each `call(...args)` restarts a timer; the
  wrapped function runs once the calls stop for the configured delay, with the
  arguments of the last call.
