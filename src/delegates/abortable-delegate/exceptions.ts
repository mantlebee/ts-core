import { BaseException, ExceptionOptions } from "@/exceptions";

/**
 * Rejection of a call of an {@link IAbortableDelegate} that was superseded by
 * a newer call or aborted with `abort()`. It is also the `reason` of the
 * aborted `AbortSignal`, so `signal.throwIfAborted()` throws it too.
 *
 * @example
 * ```ts
 * try {
 *   await search.call("ts");
 * } catch (error) {
 *   if (!isAbortedException(error)) throw error;
 *   // A newer search superseded this one: nothing to do.
 * }
 * ```
 */
export class AbortedException extends BaseException {
  public constructor(message = "The call was aborted", options?: ExceptionOptions) {
    super(message, options);
    this.name = "AbortedException";
  }
}

/**
 * Tells whether `error` is an {@link AbortedException}, so that callers can
 * ignore the rejection of a superseded call in one line.
 *
 * Besides `instanceof`, it accepts any `Error` named `AbortedException`: two
 * copies of the library in the same bundle (a common case in monorepos) have
 * two distinct classes.
 * @param error Value caught in a `catch` block.
 *
 * @example
 * ```ts
 * const items = await source.read().catch((error) => {
 *   if (isAbortedException(error)) return [];
 *   throw error;
 * });
 * ```
 */
export function isAbortedException(error: unknown): error is AbortedException {
  return error instanceof AbortedException || (error instanceof Error && error.name === "AbortedException");
}
