import { Dictionary } from "@/common";
import { NumericIdentityManager } from "@/identities";

import { ISubscribable } from "./interfaces";
import { Subscription } from "./types";

/**
 * Implementation of {@link ISubscribable} with a {@link notifyData} to call the subscribers.
 */
export class Subscribable<TData> implements ISubscribable<TData> {
  private identityManager = new NumericIdentityManager();
  private subscriptions: Dictionary<Subscription<TData>> = {};

  /**
   * Calls all subscribers.
   * @param data Data to pass to subscribers.
   */
  public notifyData(data: TData): void {
    Object.values(this.subscriptions).forEach((a) => a(data));
  }

  public subscribe(subscription: Subscription<TData>): number {
    const id = this.identityManager.newValue();
    this.subscriptions[id] = subscription;
    return id;
  }
  public unsubscribe(id: number): void {
    delete this.subscriptions[id];
  }
}
