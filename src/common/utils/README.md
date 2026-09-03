# `common/utils`

**Pure utility functions** — no state, no side effects. Grouped by the kind of
value they operate on. Includes the `isX` runtime type guards used across the
library.

## What's in here

- **`values.ts`** — `getValue` (resolve a `ValueOrGetter`), `isDefined`,
  `isNull`, `isUndefined`, `isNullOrUndefined`.
- **`arrays.ts`** — `isArray`, `firstOrDefault`, `listToDictionary`,
  `replaceListItems`.
- **`objects.ts`** — `isObject` (plain object only), `objectHasKey`.
- **`booleans.ts`** — `isBoolean`.
- **`numbers.ts`** — `isNumber`, `numberIsInteger`, `roundNumber`.
- **`strings.ts`** — `isString`, `isEmail`, `isGuid`, `createSlug`,
  `formatString`, `generateGuid`, `createHash`.
- **`functions.ts`** — `isFunction`.
- **`chars.ts`** — character-range builders (`getLowercaseChars`,
  `getUppercaseChars`, `getNumberChars`, `getSpecialChars`, …).
- **[`dates/`](./dates)** — `isDate`.
- **[`promises/`](./promises)** — the deferred-promise abstraction and its
  implementations.
