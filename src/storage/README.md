# `storage`

**Key/value storages.** `IStorage` exposes `get`, `set`, `has`, `remove` and
`clear`; `get` returns `null` for missing keys.

## What's in here

- **`interfaces.ts`** — `IStorage` and `IStorer` (a single value bound to a
  fixed key).
- **`models.ts`** — `Storer`, the `IStorer` over any `IStorage`.
- **`in-memory/`** — `InMemoryStorage` (values kept as they are) and
  `InMemoryStorer`.
- **`web/`** — `WebStorage`, backed by a Web Storage with JSON serialization;
  `LocalStorage` and `SessionStorage` use `localStorage` and `sessionStorage`.
  Browser only; the Web Storage is resolved lazily, so instances can be created
  anywhere.
- **`globals/`** — `createGlobalsStore`: global values, one per property of a
  model, saved together under a key (default in `SessionStorage`).
