/**
 * Runs async functions **one at a time**, in the order they were enqueued:
 * a mutual-exclusion lock held for the duration of each function.
 *
 * @example
 * ```ts
 * const lock: IAsyncLock = new AsyncLock();
 * await lock.run(async () => {
 *   source.filter = "a";
 *   await source.read(); // no other function of the lock runs meanwhile
 * });
 * ```
 */
export interface IAsyncLock {
  /** `true` while a function is running. */
  readonly isLocked: boolean;
  /** Number of functions waiting for the lock. */
  readonly pendingCount: number;
  /**
   * Runs `fn` once every function enqueued before it has settled.
   * @param fn Function to run while holding the lock.
   * @returns Resolves or rejects with the outcome of `fn`.
   */
  run<TResult>(fn: () => Promise<TResult>): Promise<TResult>;
}
