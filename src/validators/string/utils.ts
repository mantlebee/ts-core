import { ValidatorDelegate } from "../types";
import { createValidationCollector } from "../utils";
import { StringValidationMessages } from "./constants";
import { StringValidatorOptions } from "./types";

/**
 * Validates a string. Checks, in order:
 * 1. `required`: empty or whitespace-only strings (and `null`/`undefined`)
 *    are invalid if required, otherwise valid with no further checks;
 * 2. `pattern`: if it fails, the lengths are not checked;
 * 3. `minLength` and `maxLength`.
 * @param value String to validate.
 * @param options Validation options.
 * @returns a promise resolved with the validation result.
 */
export const stringValidatorDelegate: ValidatorDelegate<
  string,
  StringValidatorOptions
> = (value, options) => {
  const { error, resolve } = createValidationCollector();
  if (!value?.trim()) {
    if (options?.required) error(StringValidationMessages.required);
    return resolve();
  }
  if (options?.pattern) {
    options.pattern.lastIndex = 0;
    if (!options.pattern.test(value)) {
      error(StringValidationMessages.pattern);
      return resolve();
    }
  }
  if (options?.maxLength && value.length > options.maxLength)
    error(StringValidationMessages.maxLength);
  if (options?.minLength && value.length < options.minLength)
    error(StringValidationMessages.minLength);
  return resolve();
};
