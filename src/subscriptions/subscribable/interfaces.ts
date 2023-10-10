import { Subscription } from "./types";

/**
 * Represents a subscribable element. It allows to (un)subscribe to an instance.
 * When the subscribers are notified, depends on the implementation of the interface.
 */
export interface ISubscribable<TData, TId = number> {
  subscribe(subscription: Subscription<TData>): TId;
  unsubscribe(id: TId): void;
}
