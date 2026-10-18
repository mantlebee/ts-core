import { Validator } from "../models";
import { UrlValidatorOptions } from "./types";
import { urlValidatorDelegate } from "./utils";

/**
 * {@link Validator} of absolute URLs. See {@link urlValidatorDelegate}.
 */
export class UrlValidator extends Validator<string, UrlValidatorOptions> {
  /**
   * @param options Validation options.
   */
  public constructor(options?: UrlValidatorOptions) {
    super(urlValidatorDelegate, options);
  }
}
