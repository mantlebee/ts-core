import { ValidatorOptions } from "../types";

/**
 * Options of {@link stringValidatorDelegate}.
 */
export type StringValidatorOptions = ValidatorOptions & {
  /** Maximum number of chars. */
  maxLength?: number;
  /** Minimum number of chars. */
  minLength?: number;
  /**
   * Regex the value must match. It is checked after `required`: if it fails,
   * `minLength` and `maxLength` are not checked.
   */
  pattern?: RegExp;
};
