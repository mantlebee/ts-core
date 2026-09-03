# `builders`

The **builder + abstract-factory** pattern. A `Builder` produces an object of
type `T` without its callers needing to know whether the app is running in debug
or release mode — it asks an `IFactory` for the right variant based on the global
[`DebugMode`](../debug) switch.

## What's in here

- **`factory/`** — `IFactory<T>`: `createDebug()` / `createRelease()`. The
  abstract factory a caller implements to describe the two variants of `T`.
- **`builder/`** — `IBuilder<T>` and the default `Builder<T>` implementation,
  which delegates to an `IFactory<T>` and picks the variant from `DebugMode`.

## Usage

```ts
const factory: IFactory<Api> = {
  createDebug: () => new FakeApi(),
  createRelease: () => new HttpApi(),
};
const api = new Builder(factory).build(); // FakeApi when DebugMode.isEnabled
```
