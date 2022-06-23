import { Subscription } from "./types";

export interface ISubscribable<TData, TId = number> {
  subscribe(subscription: Subscription<TData>): TId;
  unsubscribe(id: TId): void;
}
