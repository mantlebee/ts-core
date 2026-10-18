import { Validator } from "../models";
import { Ipv4RangeValidatorOptions } from "./types";
import { ipv4RangeValidatorDelegate } from "./utils";

/**
 * {@link Validator} of the end address of an IPv4 range. See
 * {@link ipv4RangeValidatorDelegate}.
 */
export class Ipv4RangeValidator extends Validator<
  string,
  Ipv4RangeValidatorOptions
> {
  /**
   * @param getStartIp Returns the start address of the range.
   * @param options Validation options.
   */
  public constructor(
    getStartIp: () => string,
    options?: Ipv4RangeValidatorOptions
  ) {
    super((a, b) => ipv4RangeValidatorDelegate(a, getStartIp, b), options);
  }
}
