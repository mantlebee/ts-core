# `notifications`

**Notifications to the user** (toasts, snackbars, alerts, …) through a
pluggable sink. `INotifier` exposes one method per level (`notifyDebug`,
`notifyError`, `notifyInfo`, `notifySuccess`, `notifyWarning`), with the same
levels of [`LogTypes`](../loggers).

## What's in here

- **`notifier/`** — `INotifier`, `NotifierDelegate` (the
  `(type, ...args) => void` sink) and `Notifier`, which forwards every
  notification to the delegate.
