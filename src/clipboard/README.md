# `clipboard`

**System clipboard access.** `IClipboard` reads, writes and clears the
clipboard; non-string values are serialized as JSON on write and deserialized
on read.

## What's in here

- **`interfaces.ts`** — `IClipboard`.
- **`models.ts`** — `WebClipboard`: implementation backed by
  `navigator.clipboard`. Browser only, in a secure context.
