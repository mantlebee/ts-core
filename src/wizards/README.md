# `wizards`

Driving a **multi-step flow** through its lifecycle: start, go forward / back,
complete or abort — with each transition gated by the current status and by
per-step `before…` hooks.

## What's in here

- **`interfaces.ts`** — `IWizard` (the flow: `canGoBack`/`canGoForward`/… flags,
  `start` / `goForward` / `goBack` / `complete` / `abort`, all async) and
  `IWizardStep` (a step: its own can-move flags, optional `nextStep`, and
  `beforeEnter` / `beforeGoBack` / `beforeGoForward` hooks).
- **`wizard/`**
  - `models.ts` — `Wizard`, the default implementation.
  - `constants.ts` — `WizardStatuses` (lifecycle, incl. transient `-ing` states)
    and `WizardOperations`.
  - `types.ts` — `WizardContext`: the host-provided abort/complete behaviour and
    permissions.
  - `exceptions.ts` — the coded `*NotAllowedException` / `EmptyStepsException` /
    `InvalidOperationForStatusException` errors, extending
    [`Exception`](../exceptions).
  - `utils.ts` — the pure step-navigation helpers `models.ts` composes.
