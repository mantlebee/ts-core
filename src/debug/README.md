# `debug`

The library-wide **debug-mode switch**.

## What's in here

- **`index.ts`** — `DebugMode`, an [`Enablable`](../common/classes) instance,
  disabled by default. [`builders`](../builders) reads it to decide whether to
  build the debug or the release variant of an object. Toggle it with
  `DebugMode.enable()` / `DebugMode.disable()`.
