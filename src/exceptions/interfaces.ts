/**
 * An error that carries a machine-readable code alongside its message.
 */
export interface IException {
  /** Machine-readable identifier of the error. */
  code: string;
  /** Human-readable description of the error. */
  message: string;
}
