import { Any } from "@/common";

/**
 * A promise whose settlement is controlled from the outside: call {@link wait}
 * to obtain the promise, then {@link resolve} or {@link reject} it later from
 * unrelated code.
 * @typeParam TValue Type the promise resolves with; defaults to `void`.
 */
export interface IDeferred<TValue = void> {
  /**
   * Rejects the pending promise.
   * @param reason Rejection reason forwarded to the promise.
   */
  reject(reason?: Any): void;
  /**
   * Resolves the pending promise.
   * @param value Value the promise resolves with.
   */
  resolve(value: TValue): void;
  /**
   * Returns the promise to await; it stays pending until {@link resolve} or
   * {@link reject} is called.
   * @returns the deferred promise.
   */
  wait(): Promise<TValue>;
}
