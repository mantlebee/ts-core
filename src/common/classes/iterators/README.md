# `common/classes/iterators`

The **`IIterator`** concept: a minimal, one-directional cursor over a sequence —
`getCurrent()`, `goNext()`, `hasMore()`. Deliberately smaller than the ES
iterator protocol; just enough to drive a `while (it.hasMore())` loop.

## What's in here

- **`interfaces.ts`** — `IIterator<TItem>`.
- **`array-iterator/`** — `ArrayIterator`: walks an array forward from index 0.
  The array is held by reference, so later mutations are visible to the cursor.
