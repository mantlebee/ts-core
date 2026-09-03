# `scheduling`

**Describing recurring executions** — the data shapes for "run this daily / on
these week days / on the first Monday of these months", built on the
[`calendar`](../calendar) enums. This folder defines the schedule *descriptions*,
not an engine that runs them.

## What's in here

- **`schedule/constants.ts`** — `ScheduleTypes` enum (one-time, daily, weekly,
  monthly-by-day, monthly-by-weekday).
- **`schedule/types.ts`**
  - `ScheduleTime` — `{ hours, minutes }`.
  - `ScheduleRepeat` — repeat `every` X time, optionally for a `duration`.
  - `Schedule` — the common base: `startDate`, optional `expireDate`, optional
    `repeat`.
  - `OneTimeSchedule`, `DailySchedule`, `WeeklySchedule`, `MonthlyByDaySchedule`,
    `MonthlyByWeeklyDaySchedule` — the specific recurrence shapes.
