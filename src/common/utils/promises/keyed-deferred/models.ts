import { Any } from "@/common";

import { IDeferred } from "../interfaces";
import { PromiseResolvers } from "./types";

/**
 * {@link IDeferred} whose pending promise is stored against a key in a registry
 * shared by every `KeyedDeferred`. Any instance created with the same key can
 * settle the promise, so the producer and the consumer never need a direct
 * reference to each other. Registering a new promise for a key replaces the
 * previous one, and at most one promise is pending per key at a time.
 * @typeParam TValue Type the promise resolves with; defaults to `void`.
 * @typeParam TKey Type of the key identifying the promise; defaults to {@link Any}.
 */
export class KeyedDeferred<
  TValue = void,
  TKey = Any,
> implements IDeferred<TValue> {
  /** Registry of pending promises, shared across all instances, keyed by `key`. */
  private static readonly map = new Map<Any, PromiseResolvers>();

  /**
   * @param key Key the pending promise is registered under.
   * @param timeoutAfter Optional delay, in milliseconds, after which {@link wait}
   * automatically rejects the promise with `key` as the reason.
   */
  public constructor(
    protected readonly key: TKey,
    protected readonly timeoutAfter?: number,
  ) {}

  /**
   * Creates a fresh promise, registers its resolvers under {@link key}, and, when
   * `timeoutAfter` was given, schedules its automatic rejection.
   * @returns a promise that stays pending until {@link resolve} / {@link reject}
   * is called for the same key (or the timeout elapses).
   */
  public wait(): Promise<TValue> {
    if (this.timeoutAfter) {
      setTimeout(() => this.reject(this.key), this.timeoutAfter);
    }
    return new Promise<TValue>((resolve, reject) => {
      KeyedDeferred.map.set(this.key, { reject, resolve });
    });
  }

  /**
   * Rejects the promise currently registered for {@link key}; does nothing when
   * no promise is pending for it.
   * @param reason Rejection reason forwarded to the promise.
   */
  public reject(reason?: unknown): void {
    const pendingResolvers = KeyedDeferred.map.get(this.key);
    if (pendingResolvers) pendingResolvers.reject(reason);
  }
  /**
   * Resolves the promise currently registered for {@link key}; does nothing when
   * no promise is pending for it.
   * @param value Value the promise resolves with.
   */
  public resolve(value: TValue): void {
    const pendingResolvers = KeyedDeferred.map.get(this.key);
    if (pendingResolvers) pendingResolvers.resolve(value);
  }
}
