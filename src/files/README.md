# `files`

**Reading files and blobs** as promises. Browser only: they rely on
`FileReader`.

## What's in here

- **`utils.ts`** — `readFileAsDataUrl`, `readFileAsText`. Both reject with the
  read error if the file can't be read.
