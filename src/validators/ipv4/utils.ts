import { StringValidationMessages, stringValidatorDelegate } from "../string";
import { ValidatorDelegate } from "../types";
import { Ipv4Regex, Ipv4ValidationMessages } from "./constants";
import { Ipv4ValidatorOptions } from "./types";

/**
 * Validates an IPv4 address (see {@link Ipv4Regex}). Empty values are invalid
 * only if `required`.
 * @param value Address to validate.
 * @param options Validation options.
 * @returns a promise resolved with the validation result.
 */
export const ipv4ValidatorDelegate: ValidatorDelegate<
  string,
  Ipv4ValidatorOptions
> = (value, options) =>
  stringValidatorDelegate(value, {
    pattern: Ipv4Regex,
    required: options?.required,
  }).then((validation) => {
    if (!validation.isValid)
      validation.messages = validation.messages?.map((a) =>
        a === StringValidationMessages.pattern
          ? Ipv4ValidationMessages.invalidIp
          : a
      );
    return validation;
  });
