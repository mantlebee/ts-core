# `loggers`

A **logging abstraction with pluggable sinks**. `ILogger` exposes `log(type, …)`
plus one helper per level (`logDebug`, `logError`, `logInfo`, `logSuccess`,
`logWarning`). The base `Logger` forwards every entry to a `LogDelegate`; where
the entry actually goes is the delegate's job.

## What's in here

- **`interfaces.ts`** — `ILogger`.
- **`contants.ts`** — `LogTypes` enum (severity/category).
- **`types.ts`** — `LogDelegate`, the `(type, message, data?) => void` sink.
- **`models.ts`** — `Logger`, the delegating base class.
- **`console-logger/`** — `ConsoleLogger`: writes to the matching `console`
  method per `LogTypes`.
- **`subscribable-logger/`** — `SubscribableLogger`: instead of writing anywhere,
  notifies subscribers with each entry as `SubscribableLoggerData`. Combines
  `Logger` with [`subscriptions`](../subscriptions).
