import { Any } from "@/common";

import { IDeferred } from "../interfaces";
import { PromiseResolvers } from "./types";

/**
 * Registry of pending promises, shared across all `KeyedDeferred` instances, keyed by `key`.
 * Kept at module level instead of as a static field: with an ES6 target TypeScript
 * emits static fields as an assignment after the class, which bundlers treat as a
 * side effect and which would prevent `KeyedDeferred` from being tree-shaken.
 */
const KeyedDeferredPendingResolvers = new Map<Any, PromiseResolvers>();

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
   * `timeoutAfter` was given, schedules its automatic rejection. Once settled,
   * the promise is removed from the registry.
   * @returns a promise that stays pending until {@link resolve} / {@link reject}
   * is called for the same key (or the timeout elapses).
   */
  public wait(): Promise<TValue> {
    const { key, timeoutAfter } = this;
    return new Promise<TValue>((resolve, reject) => {
      let timeout: ReturnType<typeof setTimeout> | undefined;
      // Settling removes the entry from the registry (only if it is still the
      // registered one: a newer `wait` may have replaced it) and stops its timer.
      const settle =
        <TArg>(settler: (arg: TArg) => void) =>
        (arg: TArg) => {
          if (KeyedDeferredPendingResolvers.get(key) === resolvers)
            KeyedDeferredPendingResolvers.delete(key);
          clearTimeout(timeout);
          settler(arg);
        };
      const resolvers: PromiseResolvers<TValue> = {
        reject: settle(reject),
        resolve: settle(resolve),
      };
      KeyedDeferredPendingResolvers.set(key, resolvers);
      if (timeoutAfter !== undefined)
        timeout = setTimeout(() => resolvers.reject(key), timeoutAfter);
    });
  }

  /**
   * Rejects the promise currently registered for {@link key}; does nothing when
   * no promise is pending for it.
   * @param reason Rejection reason forwarded to the promise.
   */
  public reject(reason?: unknown): void {
    const pendingResolvers = KeyedDeferredPendingResolvers.get(this.key);
    if (pendingResolvers) pendingResolvers.reject(reason);
  }
  /**
   * Resolves the promise currently registered for {@link key}; does nothing when
   * no promise is pending for it.
   * @param value Value the promise resolves with.
   */
  public resolve(value: TValue): void {
    const pendingResolvers = KeyedDeferredPendingResolvers.get(this.key);
    if (pendingResolvers) pendingResolvers.resolve(value);
  }
}
