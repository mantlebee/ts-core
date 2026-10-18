import { stringValidatorDelegate } from "../string";
import { ValidatorDelegate } from "../types";
import { UrlValidationMessages } from "./constants";
import { UrlValidatorOptions } from "./types";

/**
 * Validates an absolute URL, as parsed by the `URL` constructor. Empty values
 * are invalid only if `required`.
 * @param value URL to validate.
 * @param options Validation options.
 * @returns a promise resolved with the validation result.
 */
export const urlValidatorDelegate: ValidatorDelegate<
  string,
  UrlValidatorOptions
> = (value, options) =>
  stringValidatorDelegate(value, { required: options?.required }).then(
    (validation) => {
      if (!validation.isValid || !value?.trim()) return validation;
      try {
        new URL(value.trim());
        return validation;
      } catch {
        return { isValid: false, messages: [UrlValidationMessages.invalidUrl] };
      }
    }
  );
