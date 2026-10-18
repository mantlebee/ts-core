# `exceptions`

**Error base types** with the class `name`, an optional machine-readable `code`
and the original `cause`, so callers can branch on the type or the code instead
of parsing text.

## What's in here

- **`types.ts`** — `ExceptionOptions`: `code` and `cause`.
- **`interfaces.ts`** — `IException`: `code` + `message`.
- **`models.ts`**:
  - `BaseException` — extends the built-in `Error`; base of every exception of
    the library. Subclasses set `name` explicitly, since class names don't
    survive minification.
  - `Exception` — a `BaseException` with a required `code`, implementing
    `IException`. Meant to be subclassed by domain-specific exceptions (see
    [`wizards/wizard/exceptions.ts`](../wizards/wizard/exceptions.ts) for an
    example that prefixes and namespaces its codes).
  - `GenericException`, `MethodNotImplementedException`,
    `UnmanagedCaseException` — ready-to-use exceptions with a default message.
