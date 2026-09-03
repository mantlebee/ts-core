# `common/classes/disposable`

The **`IDisposable`** concept: something that holds a resource (a subscription, a
handler, a list entry, …) which has to be released explicitly. `dispose()` is
async and implementations should be safe to call more than once.

## What's in here

- **`interfaces.ts`** — `IDisposable`.
- **`list-item-disposable/`** — `ListItemDisposable`: on `dispose()` removes a
  specific item (matched by reference) from a list, in place. Handy as the
  "unsubscribe handle" returned by collection-backed registries.
