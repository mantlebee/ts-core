import { List } from "@/common";

/**
 * Result of a validation.
 */
export type Validation = {
  /** True if the value is valid. */
  isValid: boolean;
  /**
   * Keys of the failed checks (e.g. `"empty"`, `"invalidEmail"`), meant to be
   * translated by the consumer. Missing when the value is valid.
   */
  messages?: List<string>;
};

/**
 * Function that validates a value.
 * @typeParam TValue Type of the value.
 * @typeParam TOptions Type of the validation options.
 * @param value Value to validate.
 * @param options Validation options.
 * @returns a promise resolved with the validation result.
 */
export type ValidatorDelegate<TValue, TOptions = ValidatorOptions> = (
  value: TValue,
  options?: TOptions
) => Promise<Validation>;

/**
 * Options shared by every validator.
 */
export type ValidatorOptions = {
  /**
   * If true, empty values are invalid. Default `false`: empty values are valid
   * and the other options are not checked.
   * It is always checked first: if it fails, the other options are not checked.
   */
  required?: boolean;
};
