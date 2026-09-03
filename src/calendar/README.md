# `calendar`

Shared **calendar vocabulary** — the enums other features (notably
[`scheduling`](../scheduling)) use to talk about points in a month or week
without magic numbers.

## What's in here

- **`constants.ts`**
  - `Months` — 1-based (`january` = 1 … `december` = 12).
  - `WeekDays` — 1-based (`monday` = 1 … `sunday` = 7).
  - `MonthDays` — 1-based day of month (`first` = 1 … `thirtyFirst` = 31), plus
    `last` = -1.
  - `MonthWeekConditions` — which occurrence of a weekday within a month
    (`first` … `fourth`, plus `last` = -1).

`last` is `-1` in the day/occurrence enums so it can be told apart from the
positional values.
