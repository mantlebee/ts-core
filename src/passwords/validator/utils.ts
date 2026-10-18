import { stringValidatorDelegate, ValidatorDelegate } from "@/validators";

import { validatePassword } from "../utils";
import { PasswordValidatorOptions } from "./types";

/**
 * Validates a password against its requirements (see {@link validatePassword}).
 * Empty values are invalid only if `required`.
 * @param value Password to validate.
 * @param options Validation options.
 * @returns a promise resolved with the validation result.
 */
export const passwordValidatorDelegate: ValidatorDelegate<
  string,
  PasswordValidatorOptions
> = (value, options) =>
  stringValidatorDelegate(value, { required: options?.required }).then(
    (validation) => {
      if (!validation.isValid || !value) return validation;
      return validatePassword(value, options?.requirements);
    }
  );
