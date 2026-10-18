import { isNumber } from "@/common";

import { ValidatorDelegate } from "../types";
import { createValidationCollector } from "../utils";
import { NumberValidationMessages } from "./constants";
import { NumberValidatorOptions } from "./types";

/**
 * Validates a number. Values that are not numbers (`null`, `undefined`, `NaN`)
 * are empty: invalid if `required`, otherwise valid with no further checks.
 * Then `min` and `max` are checked.
 * @param value Number to validate.
 * @param options Validation options.
 * @returns a promise resolved with the validation result.
 */
export const numberValidatorDelegate: ValidatorDelegate<
  number,
  NumberValidatorOptions
> = (value, options) => {
  const { error, resolve } = createValidationCollector();
  if (!isNumber(value) || isNaN(value)) {
    if (options?.required) error(NumberValidationMessages.required);
    return resolve();
  }
  if (isNumber(options?.max) && value > options!.max!)
    error(NumberValidationMessages.max);
  if (isNumber(options?.min) && value < options!.min!)
    error(NumberValidationMessages.min);
  return resolve();
};
