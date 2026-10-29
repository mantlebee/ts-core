import { List } from "@/common";

import { IAsyncLock } from "./interfaces";

/**
 * Exclusive, non-reentrant, FIFO lock for async functions.
 *
 * {@link run} enqueues a function and runs it once every function enqueued
 * before it has settled, so the functions never overlap: the lock is held
 * for the duration of the function and released when it resolves or rejects.
 * A rejection (or a synchronous throw) rejects that `run` only: the next
 * function starts anyway.
 *
 * The lock is **not reentrant**: a `run` called from inside a running
 * function waits for that function, which waits for the inner `run`, so it
 * never completes. It cannot be detected cheaply (an async caller has no
 * identity), so it is a caller error: run the inner work directly instead.
 *
 * Combined with `AbortableDelegate`, a function enqueued by a call that was
 * superseded while waiting for the lock checks its signal as soon as it
 * starts and returns at once.
 *
 * @example
 * ```ts
 * const lock = new AsyncLock();
 * // Both reads write the same filter: they run one after the other.
 * lock.run(async () => {
 *   source.filter = { name: "a" };
 *   suggestions = await source.read();
 * });
 * lock.run(async () => {
 *   source.filter = { id: 42 };
 *   selected = await source.read();
 * });
 * ```
 */
export class AsyncLock implements IAsyncLock {
  /** `true` while a function holds the lock. */
  private _isLocked = false;
  /** Functions waiting for the lock, as the resolvers that let them start. */
  private readonly _pending: List<() => void> = [];

  public get isLocked(): boolean {
    return this._isLocked;
  }
  public get pendingCount(): number {
    return this._pending.length;
  }
  /**
   * Runs `fn` once every function enqueued before it has settled. The lock is
   * released when `fn` settles, whatever its outcome.
   * @param fn Function to run while holding the lock.
   * @returns Resolves or rejects with the outcome of `fn`.
   */
  public async run<TResult>(fn: () => Promise<TResult>): Promise<TResult> {
    await this.acquire();
    try {
      return await fn();
    } finally {
      this.release();
    }
  }
  /**
   * Takes the lock at once when free, otherwise waits for its turn.
   */
  private acquire(): Promise<void> {
    if (!this._isLocked) {
      this._isLocked = true;
      return Promise.resolve();
    }
    return new Promise<void>((resolve) => this._pending.push(resolve));
  }
  /**
   * Hands the lock to the next waiting function, or frees it when none waits.
   */
  private release(): void {
    const next = this._pending.shift();
    if (next) next();
    else this._isLocked = false;
  }
}
