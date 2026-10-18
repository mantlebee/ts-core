# `validators`

**Asynchronous validators of values.** A validator returns a
`Promise<Validation>`: `isValid` plus the `messages` of the failed checks.
Messages are keys (e.g. `"empty"`, `"invalidEmail"`), meant to be translated by
the consumer.

Every validator comes in two forms: a `ValidatorDelegate`
(`(value, options) => Promise<Validation>`) and a `Validator` class that binds
the delegate to its options. Options extend `ValidatorOptions`: `required` is
checked first, and empty values that are not required are valid without further
checks.

## What's in here

- **`types.ts`, `interfaces.ts`, `models.ts`** — `Validation`,
  `ValidatorDelegate`, `ValidatorOptions`, `IValidator`, `Validator`.
- **`utils.ts`** — `createValidationCollector` (collects errors to build a
  `Validation`) and `mergeValidations`.
- **`requirements/`** — `IRequirement` (a named synchronous check),
  `RegexRequirement`, `RequirementsValidator` and
  `requirementsValidatorDelegate`: the failed requirement names are the messages.
- **`string/`** — `required`, then `pattern`, then `minLength`/`maxLength`.
- **`number/`** — `required` (`null`, `undefined` and `NaN` are empty), `min`,
  `max`.
- **`email/`** — valid email address (see `isEmail`).
- **`url/`** — absolute URL, as parsed by `URL`.
- **`ipv4/`** — dotted-decimal IPv4 address.
- **`ipv4-range/`** — end address of an IPv4 range, not lower than the start one.
- **`confirm-string/`** — confirmation equal to a source string (e.g. "repeat
  the password").

Passwords have their own validator, in [`passwords`](../passwords).
