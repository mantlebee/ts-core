import { IException } from "./interfaces";
import { ExceptionOptions } from "./types";

/**
 * Base of every exception of the library: an `Error` with the class
 * {@link name}, an optional machine-readable {@link code} and the original
 * {@link cause}.
 *
 * Subclasses set `name` explicitly, because class names don't survive
 * minification.
 */
export class BaseException extends Error {
  /** Original error that caused the exception, if any. */
  public readonly cause?: unknown;
  /** Machine-readable identifier of the error, if any. */
  public readonly code?: string;

  /**
   * @param message Human-readable description of the error.
   * @param options Code and original error.
   */
  public constructor(message?: string, options?: ExceptionOptions) {
    super(message);
    this.name = "BaseException";
    this.cause = options?.cause;
    this.code = options?.code;
  }
}

/**
 * A {@link BaseException} whose {@link code} is required.
 * Meant to be extended by domain-specific exceptions.
 */
export class Exception extends BaseException implements IException {
  /** Machine-readable identifier of the error. */
  declare public readonly code: string;

  /**
   * @param code Machine-readable identifier of the error.
   * @param message Human-readable description of the error.
   * @param cause Original error that caused the exception, if any.
   */
  public constructor(code: string, message: string, cause?: unknown) {
    super(message, { cause, code });
    this.name = "Exception";
  }
}

/**
 * Generic error, used when there isn't a more specific exception.
 */
export class GenericException extends BaseException {
  public constructor(message = "Generic error", options?: ExceptionOptions) {
    super(message, options);
    this.name = "GenericException";
  }
}

/**
 * Method or feature not implemented yet.
 */
export class MethodNotImplementedException extends BaseException {
  public constructor(message = "Not implemented", options?: ExceptionOptions) {
    super(message, options);
    this.name = "MethodNotImplementedException";
  }
}

/**
 * Case not handled (e.g. the `default` branch of a `switch` on an enum).
 */
export class UnmanagedCaseException extends BaseException {
  public constructor(message = "Unmanaged case", options?: ExceptionOptions) {
    super(message, options);
    this.name = "UnmanagedCaseException";
  }
}
