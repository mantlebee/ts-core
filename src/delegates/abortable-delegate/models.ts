import { List, Nullable } from "@/common";

import { AbortedException } from "./exceptions";
import { IAbortableDelegate } from "./interfaces";
import { AbortableDelegateFunction } from "./types";

/**
 * A call in progress: the token that identifies the call and the function
 * that aborts it, so that the call can be settled before its function ends.
 * The controller of the signal and the rejecter of the promise stay in the
 * closure of `abort` instead of being stored here: an instance read through a
 * proxy that wraps the objects it returns would hand back a proxied
 * controller, and a platform object cannot be operated through a proxy.
 */
type Run = {
  /** Aborts the signal of the call and rejects its promise with `exception`. */
  abort: (exception: AbortedException) => void;
  token: number;
};

/**
 * Runs an async function so that **the latest call wins**.
 *
 * Each {@link call} aborts the running call, if any: its `AbortSignal` is
 * aborted with an {@link AbortedException} as reason and its promise rejects
 * with the same exception immediately, without waiting for its function to
 * end. When the function of a superseded call settles later, its result is
 * discarded and its rejection is swallowed, so a function that cannot cancel
 * its work (a request without `signal` support) is still safe to wrap.
 *
 * A cooperative function checks `signal.aborted` after each `await` and skips
 * its side effects, or passes the signal to `fetch` and the like.
 *
 * A `call` made from inside the function supersedes the outer call, as any
 * other call would; so does a `call` made from an `"abort"` listener of the
 * superseded signal, which supersedes the call that aborted it before that
 * call runs. The class does not debounce: the function is invoked
 * synchronously by `call`; compose it with `DebouncedDelegate` when a quiet
 * time is wanted.
 *
 * @example
 * ```ts
 * // Cooperative: the signal is passed to fetch, the result applied only when
 * // the call is still the latest one.
 * const search = new AbortableDelegate(async (signal, query: string) => {
 *   const response = await fetch(`/api/users?q=${query}`, { signal });
 *   const users: User[] = await response.json();
 *   if (!signal.aborted) render(users);
 *   return users;
 * });
 * search.call("a").catch(() => undefined); // superseded: rejects with AbortedException
 * const users = await search.call("ab"); // the result of "ab"
 * ```
 *
 * @example
 * ```ts
 * // Plain check: the reader cannot be cancelled, the side effect is skipped.
 * const load = new AbortableDelegate(async (signal, id: number) => {
 *   const item = await repository.get(id);
 *   if (signal.aborted) return item;
 *   selected = item;
 *   return item;
 * });
 * ```
 */
export class AbortableDelegate<TArgs extends List<unknown>, TResult>
  implements IAbortableDelegate<TArgs, TResult>
{
  /** Function to run. */
  private readonly _delegate: AbortableDelegateFunction<TArgs, TResult>;
  /** The running call, `null` when none is running. */
  private _current: Nullable<Run> = null;
  /**
   * Sequence number of the last call. Each call keeps its own token and,
   * when its function settles, compares it with the token of the running
   * call to know whether it is still the latest one. The comparison is on a
   * primitive on purpose: an instance read through a proxy that wraps the
   * objects it returns (a reactive or observable membrane) would never find
   * the raw `Run` of a call equal to the proxied one read back from `this`.
   */
  private _token = 0;

  /**
   * @param delegate Function to run on each {@link call}; it receives the
   * signal of the call, then the arguments of the call.
   */
  public constructor(delegate: AbortableDelegateFunction<TArgs, TResult>) {
    this._delegate = delegate;
  }
  public get isRunning(): boolean {
    return this._current !== null;
  }
  /**
   * Aborts the running call, if any: its signal is aborted and its promise
   * rejects with an {@link AbortedException}. Does nothing when no call is
   * running.
   */
  public abort(): void {
    const current = this._current;
    if (current === null) return;
    this._current = null;
    current.abort(new AbortedException());
  }
  /**
   * Aborts the running call, if any, then runs the function with a fresh
   * signal. The function is invoked synchronously; a synchronous throw rejects
   * the returned promise like a rejection would.
   * @param args Arguments forwarded to the function, after the signal.
   * @returns The result of this call, or an {@link AbortedException} when a
   * newer call supersedes it.
   */
  public call(...args: TArgs): Promise<TResult> {
    this.abort();
    // Aborting the running call fires its "abort" listeners synchronously: a
    // call made by one of them is newer than this one, so this one is
    // superseded before it runs.
    if (this._current !== null) return Promise.reject(new AbortedException());
    const token = ++this._token;
    const controller = new AbortController();
    return new Promise<TResult>((resolve, reject) => {
      this._current = {
        abort: (exception) => {
          controller.abort(exception);
          reject(exception);
        },
        token,
      };
      // Settles the call only while it is still the latest one: a superseded
      // call was already rejected by abort(), so its outcome is discarded.
      const settle =
        <TValue>(settler: (value: TValue) => void) =>
        (value: TValue): void => {
          if (this._current?.token !== token) return;
          this._current = null;
          settler(value);
        };
      let promise: Promise<TResult>;
      try {
        promise = Promise.resolve(this._delegate(controller.signal, ...args));
      } catch (error) {
        promise = Promise.reject(error);
      }
      promise.then(settle(resolve), settle(reject));
    });
  }
}
