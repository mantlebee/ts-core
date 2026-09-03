# `common/classes/smart-objects`

The **`ISmartObject`** concept: a deliberately tiny contract for reading and
writing a value **by key** — `get` / `has` / `set` / `unset`, and nothing else.

What a `key` means is left entirely to the implementation, so callers can swap
one for another without changing their code, and a wrapper can layer behaviour on
top (immutability, copy-on-write, validation, logging, change events, access
control…) just by holding another `ISmartObject` and forwarding the same four
calls. Richer needs — enumerating keys, merging, transactions — belong in a wider
interface built on top, not here.

## What's in here

- **`interfaces.ts`** — `ISmartObject`.
- **`flat/`** — `FlatObject`: the simplest implementation. Keys are literal
  property names on the wrapped object; no path syntax.
- **`nested/`** — `NestedObject`: keys are separator-delimited paths
  (`"user.address.city"`, `"items.0.id"`). Options control the separator and
  whether missing / conflicting intermediate containers are created or replaced.
  Reads and writes go straight through to the wrapped object, mutating it in
  place.
- **`immutable/`** — `ImmutableObject`: an immutable, versioned view built on the
  copy-on-write pattern. The input object and every parent version are never
  mutated; `clone()` forks a new version that shares data until its first write.
  It stays generic by delegating all path work to an injected
  `SmartObjectFactory` — it never assumes a key syntax of its own.
