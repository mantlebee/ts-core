import { isEmail } from "@/common";

import { stringValidatorDelegate } from "../string";
import { ValidatorDelegate } from "../types";
import { EmailValidationMessages } from "./constants";
import { EmailValidatorOptions } from "./types";

/**
 * Validates an email address (see {@link isEmail}). Empty values are invalid
 * only if `required`.
 * @param value Email to validate.
 * @param options Validation options.
 * @returns a promise resolved with the validation result.
 */
export const emailValidatorDelegate: ValidatorDelegate<
  string,
  EmailValidatorOptions
> = (value, options) =>
  stringValidatorDelegate(value, { required: options?.required }).then(
    (validation) => {
      if (!validation.isValid || !value?.trim()) return validation;
      return isEmail(value)
        ? validation
        : { isValid: false, messages: [EmailValidationMessages.invalid] };
    }
  );
