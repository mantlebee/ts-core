# `passwords`

**Password requirements and validation.** A password policy is a list of
`IPasswordRequirement`s: each one validates the password and, when it can,
describes the chars (`allowedChars`) and lengths (`minLength`, `maxLength`) it
accepts, so a generator can produce passwords that satisfy it. Password
generation is not part of this library.

## What's in here

- **`constants.ts`** — `PasswordRequirementsDefaultNames` (names used as
  validation messages) and `PasswordSymbolsDefault`.
- **`interfaces.ts`** — `IPasswordRequirement`, extends the
  [`IRequirement`](../validators/requirements) of the validators.
- **`models.ts`** — `PasswordRequirement`, a `RegexRequirement` with
  `allowedChars`.
- **`requirements/`** — the built-in requirements: length, lowercase letter,
  uppercase letter, number, symbol, no whitespaces, match another password.
- **`utils.ts`** — `PasswordRequirementsDefault` (a common policy) and
  `validatePassword`.
- **`validator/`** — `PasswordValidator` / `passwordValidatorDelegate`: the
  password as an asynchronous [`validator`](../validators).
