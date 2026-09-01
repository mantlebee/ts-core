import { Subscription } from "./types";

/**
 * Represents a subscribable element. It allows to (un)subscribe to an instance.
 * When the subscribers are notified depends on the implementation of the interface.
 * @typeParam TData Type of the payload delivered to subscribers.
 * @typeParam TId Type of the handle returned by {@link subscribe}, default `number`.
 */
export interface ISubscribable<TData, TId = number> {
  /**
   * Registers a subscriber.
   * @param subscription Callback invoked on every notification.
   * @returns the handle to pass to {@link unsubscribe}.
   */
  subscribe(subscription: Subscription<TData>): TId;
  /**
   * Removes a previously registered subscriber.
   * @param id Handle returned by {@link subscribe}.
   */
  unsubscribe(id: TId): void;
}
