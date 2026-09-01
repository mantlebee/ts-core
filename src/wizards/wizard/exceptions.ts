import { Exception } from "@/exceptions";

import { WizardOperations, WizardStatuses } from "./constants";

const WizardPrefix = "W";

enum WizardErrors {
  abortNotAllowed,
  completeNotAllowed,
  emptySteps,
  goBackNotAllowed,
  goForwardNotAllowed,
  invalidOperationForStatus,
  startNotAllowed,
}

class WizardException extends Exception {
  public constructor(code: WizardErrors, message: string) {
    const codeWithPrefix = WizardPrefix + code;
    super(codeWithPrefix, message);
  }
}

/** Thrown when `abort()` is called while `canAbort` is `false`. */
export class AbortNotAllowedException extends WizardException {
  public constructor() {
    super(
      WizardErrors.abortNotAllowed,
      "'abort' executed while 'canAbort' is false"
    );
  }
}
/** Thrown when `complete()` is called while `canComplete` is `false`. */
export class CompleteNotAllowedException extends WizardException {
  public constructor() {
    super(
      WizardErrors.completeNotAllowed,
      "'complete' executed while 'canComplete' is false"
    );
  }
}
/** Thrown when a wizard is constructed with an empty list of steps. */
export class EmptyStepsException extends WizardException {
  public constructor() {
    super(WizardErrors.emptySteps, "Wizard can't be initialized without steps");
  }
}
/** Thrown when `goBack()` is called while `canGoBack` is `false`. */
export class GoBackNotAllowedException extends WizardException {
  public constructor() {
    super(
      WizardErrors.goBackNotAllowed,
      "'goBack' executed while 'canGoBack' is false"
    );
  }
}
/** Thrown when `goForward()` is called while `canGoForward` is `false`. */
export class GoForwardNotAllowedException extends WizardException {
  public constructor() {
    super(
      WizardErrors.goForwardNotAllowed,
      "'goForward' executed while 'canGoForward' is false"
    );
  }
}
/** Thrown when an operation is invoked in a status that does not allow it. */
export class InvalidOperationForStatusException extends WizardException {
  /**
   * @param operationName The operation that was rejected.
   * @param status The status the wizard was in.
   */
  public constructor(operationName: WizardOperations, status: WizardStatuses) {
    super(
      WizardErrors.invalidOperationForStatus,
      `Operation '${operationName}' not allowed while active status is ${WizardStatuses[status]}`
    );
  }
}
