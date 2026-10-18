import { Validator } from "../models";
import { StringValidatorOptions } from "./types";
import { stringValidatorDelegate } from "./utils";

/**
 * {@link Validator} of strings. See {@link stringValidatorDelegate}.
 */
export class StringValidator extends Validator<string, StringValidatorOptions> {
  /**
   * @param options Validation options.
   */
  public constructor(options?: StringValidatorOptions) {
    super(stringValidatorDelegate, options);
  }
}
