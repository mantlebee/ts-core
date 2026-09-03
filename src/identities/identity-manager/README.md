# `identities/identity-manager`

The **`IIdentityManager<T>`** concept: hands out new ids (`newValue()`) and keeps
the last one it produced (`lastValue`).

## What's in here

- **`interfaces.ts`** — `IIdentityManager<T>`.
- **`numeric-identity-manager/`** — `NumericIdentityManager`: positive integers,
  `lastValue + 1` each time. Accepts an optional starting value.
- **`guid-identity-manager/`** — `GuidIdentityManager`: a fresh GUID string each
  time.
