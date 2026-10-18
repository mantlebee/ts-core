import { Validator } from "../models";
import { confirmStringValidatorDelegate } from "./utils";

/**
 * {@link Validator} of the confirmation of a string. See
 * {@link confirmStringValidatorDelegate}.
 */
export class ConfirmStringValidator extends Validator<string> {
  /**
   * @param getSourceString Returns the string to confirm.
   */
  public constructor(getSourceString: () => string) {
    super((value) => confirmStringValidatorDelegate(getSourceString, value));
  }
}
