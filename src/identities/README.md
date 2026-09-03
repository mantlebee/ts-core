# `identities`

Two related concerns around **identifying things**: generating fresh ids, and
building keys that carry the type of the value they point at.

## What's in here

- **[`identity-manager/`](./identity-manager)** — `IIdentityManager<T>`:
  generates new ids and remembers the last one. Implementations for numeric and
  GUID ids.
- **`typed-key/`** — `TypedKey<T>` and `createTypedKey<T>()`: a unique `Symbol`
  tagged (at the type level only) with the type it stands for, for type-safe
  heterogeneous maps / registries.
