import { List } from "@/common";

/**
 * Runs an async function so that **the latest call wins**: a new call aborts
 * the running one, whose promise rejects with an `AbortedException` at once.
 *
 * @example
 * ```ts
 * const search: IAbortableDelegate<[query: string], User[]> = new AbortableDelegate(
 *   async (signal, query) => {
 *     const response = await fetch(`/api/users?q=${query}`, { signal });
 *     return response.json();
 *   }
 * );
 * ```
 */
export interface IAbortableDelegate<TArgs extends List<unknown>, TResult> {
  /** `true` from a {@link call} until the latest call settles. */
  readonly isRunning: boolean;
  /**
   * Aborts the running call, if any: its signal is aborted and its promise
   * rejects with an `AbortedException`. Does nothing when no call is running.
   */
  abort(): void;
  /**
   * Runs the function; a running call is aborted first.
   * @param args Arguments forwarded to the function, after the signal.
   * @returns The result of this call. Rejects with an `AbortedException` when
   * a newer call supersedes it or {@link abort} is called, or with the error
   * of the function when it fails.
   */
  call(...args: TArgs): Promise<TResult>;
}
