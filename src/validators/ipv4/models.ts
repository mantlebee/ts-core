import { Validator } from "../models";
import { Ipv4ValidatorOptions } from "./types";
import { ipv4ValidatorDelegate } from "./utils";

/**
 * {@link Validator} of IPv4 addresses. See {@link ipv4ValidatorDelegate}.
 */
export class Ipv4Validator extends Validator<string, Ipv4ValidatorOptions> {
  /**
   * @param options Validation options.
   */
  public constructor(options?: Ipv4ValidatorOptions) {
    super(ipv4ValidatorDelegate, options);
  }
}
