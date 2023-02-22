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
  completed,
  completing,
  goingBack,
  goingForward,
  idle,
  needToStart,
  starting,
}
