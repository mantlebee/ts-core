import { BaseException, ExceptionOptions } from "@/exceptions";

/**
 * The request is not valid.
 */
export class BadRequestException extends BaseException {
  public constructor(message?: string, options?: ExceptionOptions) {
    super(message, options);
    this.name = "BadRequestException";
  }
}

/**
 * The given credentials are not valid.
 */
export class InvalidCredentialsException extends BaseException {
  public constructor(message?: string, options?: ExceptionOptions) {
    super(message, options);
    this.name = "InvalidCredentialsException";
  }
}

/**
 * The request is not authorized (HTTP 401).
 */
export class NotAuthorizedException extends BaseException {
  public constructor(message?: string, options?: ExceptionOptions) {
    super(message, options);
    this.name = "NotAuthorizedException";
  }
}

/**
 * Unsuccessful HTTP response (status not 2xx) whose body can't be read by the
 * response reader (empty or not valid, e.g. the HTML page of a proxy).
 * Its {@link code} is `http-<status>`.
 */
export class HttpResponseException extends BaseException {
  /** HTTP status of the response. */
  public readonly status: number;
  /** HTTP status text of the response. */
  public readonly statusText: string;

  /**
   * @param response Unsuccessful response.
   * @param cause Error raised while reading the response, if any.
   */
  public constructor(response: Response, cause?: unknown) {
    super(`HTTP ${response.status} ${response.statusText}`.trim(), {
      cause,
      code: `http-${response.status}`,
    });
    this.name = "HttpResponseException";
    this.status = response.status;
    this.statusText = response.statusText;
  }
}
