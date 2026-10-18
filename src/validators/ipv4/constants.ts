/**
 * Validation messages of {@link ipv4ValidatorDelegate}.
 */
export enum Ipv4ValidationMessages {
  invalidIp = "invalidIp",
  required = "empty",
}

/**
 * Dotted-decimal IPv4 address, without leading zeros (e.g. `192.168.0.1`).
 */
export const Ipv4Regex =
  /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;
