import { stringValidatorDelegate } from "../string";
import { Validation } from "../types";
import { ConfirmStringValidationMessages } from "./constants";

/**
 * Validates the confirmation of a string (e.g. "repeat the password"): it is
 * always required and must be equal to the source string.
 * @param getSourceValue Returns the string to confirm.
 * @param value Confirmation string.
 * @returns a promise resolved with the validation result.
 */
export const confirmStringValidatorDelegate = (
  getSourceValue: () => string,
  value: string
): Promise<Validation> =>
  stringValidatorDelegate(value, { required: true }).then((validation) => {
    if (!validation.isValid) return validation;
    return value === getSourceValue()
      ? validation
      : {
          isValid: false,
          messages: [ConfirmStringValidationMessages.stringsMismatch],
        };
  });
