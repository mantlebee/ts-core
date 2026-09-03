# `common/classes`

Small, **generic base classes** and the interfaces that describe them. Each
sub-folder is one concept: an interface plus one or more implementations.

## What's in here

- **`enablable/`** — `IEnablable` / `Enablable`: anything that can be enabled or
  disabled, backed by a boolean flag. (Used by [`debug`](../../debug).)
- **[`disposable/`](./disposable)** — `IDisposable` and disposable
  implementations (e.g. one that removes an item from a list on `dispose()`).
- **[`iterators/`](./iterators)** — `IIterator`, a minimal forward cursor, plus
  implementations (e.g. over an array).
- **[`smart-objects/`](./smart-objects)** — `ISmartObject`, a tiny
  get/has/set/unset-by-key contract, plus interchangeable implementations
  (flat, nested-path, immutable/copy-on-write).
