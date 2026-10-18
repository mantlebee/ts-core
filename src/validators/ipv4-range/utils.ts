import { Ipv4Regex, ipv4ValidatorDelegate } from "../ipv4";
import { Validation } from "../types";
import { Ipv4RangeValidationMessages } from "./constants";
import { Ipv4RangeValidatorOptions } from "./types";

/**
 * Converts an IPv4 address to its unsigned 32-bit integer value.
 */
const ipv4ToNumber = (ip: string): number =>
  ip.split(".").reduce((result, octet) => result * 256 + Number(octet), 0);

/**
 * Validates the end address of an IPv4 range: it must be a valid IPv4 address
 * (see {@link ipv4ValidatorDelegate}), equal to or greater than the start one.
 * @param value End address of the range.
 * @param getStartIp Returns the start address of the range.
 * @param options Validation options.
 * @returns a promise resolved with the validation result.
 */
export const ipv4RangeValidatorDelegate = (
  value: string,
  getStartIp: () => string,
  options?: Ipv4RangeValidatorOptions
): Promise<Validation> =>
  ipv4ValidatorDelegate(value, options).then((validation) => {
    if (!validation.isValid || !value?.trim()) return validation;
    const startIp = getStartIp()?.trim() ?? "";
    if (!Ipv4Regex.test(startIp))
      return {
        isValid: false,
        messages: [Ipv4RangeValidationMessages.invalidStartIp],
      };
    if (ipv4ToNumber(value.trim()) < ipv4ToNumber(startIp))
      return {
        isValid: false,
        messages: [Ipv4RangeValidationMessages.endIpLowerThanStart],
      };
    return validation;
  });
