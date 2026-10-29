import { List } from "@/common";

/**
 * Async function run by an {@link IAbortableDelegate}. `signal` is aborted
 * when a newer call supersedes this one, or when the delegate is aborted: a
 * cooperative function checks it after each `await` to stop early, or passes
 * it to anything that takes an `AbortSignal`, such as `fetch`.
 *
 * @example
 * ```ts
 * const load: AbortableDelegateFunction<[id: number], User> = async (signal, id) => {
 *   const response = await fetch(`/api/users/${id}`, { signal });
 *   return response.json();
 * };
 * ```
 */
export type AbortableDelegateFunction<TArgs extends List<unknown>, TResult> = (
  signal: AbortSignal,
  ...args: TArgs
) => Promise<TResult>;
