import { Validator } from "../models";
import { EmailValidatorOptions } from "./types";
import { emailValidatorDelegate } from "./utils";

/**
 * {@link Validator} of email addresses. See {@link emailValidatorDelegate}.
 */
export class EmailValidator extends Validator<string, EmailValidatorOptions> {
  /**
   * @param options Validation options.
   */
  public constructor(options?: EmailValidatorOptions) {
    super(emailValidatorDelegate, options);
  }
}
