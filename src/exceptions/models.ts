import { IException } from "./interfaces";

/**
 * An `Error` that also carries a machine-readable {@link code}.
 * Meant to be extended by domain-specific exceptions.
 */
export class Exception extends Error implements IException {
  /**
   * @param code Machine-readable identifier of the error.
   * @param message Human-readable description of the error.
   */
  public constructor(
    public readonly code: string,
    public readonly message: string
  ) {
    super(message);
  }
}
