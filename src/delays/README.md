# `delays`

Mechanisms that **run code after a delay** and let you influence the timer once
it is set.

## What's in here

- **`alarm/`** — `IAlarm` / `Alarm`: schedules a delegate to run at an expiration
  `Date`. When it goes off (or before), it can be `stop()`-ped or `snooze()`-d by
  a number of milliseconds. The delegate itself receives `stop` / `snooze`
  callbacks.
