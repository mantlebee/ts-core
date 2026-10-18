import { Validation } from "./types";

/**
 * Validates values of a specific type.
 * @typeParam TValue Type of the value.
 */
export interface IValidator<TValue> {
  /**
   * Validates a value.
   * @param value Value to validate.
   * @returns a promise resolved with the validation result.
   */
  validate(value: TValue): Promise<Validation>;
}
