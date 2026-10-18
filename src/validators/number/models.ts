import { Validator } from "../models";
import { NumberValidatorOptions } from "./types";
import { numberValidatorDelegate } from "./utils";

/**
 * {@link Validator} of numbers. See {@link numberValidatorDelegate}.
 */
export class NumberValidator extends Validator<number, NumberValidatorOptions> {
  /**
   * @param options Validation options.
   */
  public constructor(options?: NumberValidatorOptions) {
    super(numberValidatorDelegate, options);
  }
}
