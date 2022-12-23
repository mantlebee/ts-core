import { Exception } from "@/exceptions";

const WizardPrefix = "W";

enum WizardErrors {
  abortNotAllowed,
  completeNotAllowed,
  goBackNotAllowed,
  goForwardNotAllowed,
  startNotAllowed,
}

class WizardException extends Exception {
  public constructor(code: WizardErrors, message: string) {
    const codeWithPrefix = WizardPrefix + code;
    super(codeWithPrefix, message);
  }
}

export class AbortNotAllowedException extends WizardException {
  public constructor() {
    super(
      WizardErrors.abortNotAllowed,
      "`abort` executed while `canAbort` is false"
    );
  }
}
export class CompleteNotAllowedException extends WizardException {
  public constructor() {
    super(
      WizardErrors.completeNotAllowed,
      "`complete` executed while `canComplete` is false"
    );
  }
}
export class GoBackNotAllowedException extends WizardException {
  public constructor() {
    super(
      WizardErrors.goBackNotAllowed,
      "`goBack` executed while `canGoBack` is false"
    );
  }
}
export class GoForwardNotAllowedException extends WizardException {
  public constructor() {
    super(
      WizardErrors.goForwardNotAllowed,
      "`goForward` executed while `canGoForward` is false"
    );
  }
}
