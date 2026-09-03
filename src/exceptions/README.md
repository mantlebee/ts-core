# `exceptions`

An **error base type that carries a machine-readable code** alongside its
message, so callers can branch on the code instead of parsing text.

## What's in here

- **`interfaces.ts`** — `IException`: `code` + `message`.
- **`models.ts`** — `Exception`, extends the built-in `Error` and implements
  `IException`. Meant to be subclassed by domain-specific exceptions (see
  [`wizards/wizard/exceptions.ts`](../wizards/wizard/exceptions.ts) for an
  example that prefixes and namespaces its codes).
