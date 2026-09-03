# `common/types`

**Reusable type helpers** — pure compile-time vocabulary, no runtime code. These
are the aliases and utility types the rest of the library is written in terms of.

## What's in here

- **`data.ts`** — `Any` (an intentional, documented `any`), `Nullable<T>`,
  `Undefinable<T>`.
- **`arrays.ts`** — `List<TItem>`.
- **`objects.ts`** — `Dictionary<TValue, TKey>`, `KeyOf`, `KeysOf`,
  `OptionalKeysOf`, `WithRequiredKey`.
- **`classes.ts`** — `ConstructorOf<TClass>`.
- **`strings.ts`** — `Stringable`.
- **`values.ts`** — `ValueOrGetter<TValue, TArg>`.
- **`instances.ts`** — `IRestorable` lifecycle interface. (`IDisposable` lives in
  [`classes/disposable`](../classes/disposable).)
