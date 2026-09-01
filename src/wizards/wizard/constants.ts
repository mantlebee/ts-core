/**
 * The operations a wizard can perform; used to report which one was invalid for
 * the current status.
 */
export enum WizardOperations {
  abort = "abort",
  complete = "complete",
  goBack = "goBack",
  goForward = "goForward",
  start = "start",
}

/**
 * Lifecycle status of a wizard. `-ing` values are transient states held while the
 * matching async operation is in flight.
 */
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
