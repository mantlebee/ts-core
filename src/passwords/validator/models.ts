import { Validator } from "@/validators";

import { PasswordValidatorOptions } from "./types";
import { passwordValidatorDelegate } from "./utils";

/**
 * {@link Validator} of passwords. See {@link passwordValidatorDelegate}.
 */
export class PasswordValidator extends Validator<
  string,
  PasswordValidatorOptions
> {
  /**
   * @param options Validation options.
   */
  public constructor(options?: PasswordValidatorOptions) {
    super(passwordValidatorDelegate, options);
  }
}
