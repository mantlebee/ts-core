/**
 * Options of a {@link BaseException}.
 */
export type ExceptionOptions = {
  /** Original error that caused the exception. */
  cause?: unknown;
  /**
   * Machine-readable identifier of the error (e.g. to translate the message or
   * to choose a handler).
   */
  code?: string;
};
