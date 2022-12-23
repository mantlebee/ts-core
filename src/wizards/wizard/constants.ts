export enum WizardOperations {
  abort = "abort",
  complete = "complete",
  goBack = "goBack",
  goForward = "goForward",
  start = "start",
}

export enum WizardStatuses {
  aborted,
  aborting,
  changingStep,
  completed,
  completing,
  idle,
  needToStart,
  starting,
}
