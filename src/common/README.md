# `common`

The **shared foundation** every other feature draws on: vocabulary types, pure
utility functions and a handful of small base classes. Nothing here is
domain-specific.

## What's in here

- **[`types/`](./types)** — reusable type helpers (`Any`, `Nullable`,
  `Dictionary`, `KeyOf`, `List`, `IDisposable`, …). No runtime code.
- **[`utils/`](./utils)** — pure, side-effect-free functions grouped by the value
  they operate on (arrays, strings, numbers, objects, dates, promises, …),
  including the `isX` type guards.
- **[`classes/`](./classes)** — small, generic base classes and the interfaces
  that describe them (enablable, disposable, iterators, smart objects).
