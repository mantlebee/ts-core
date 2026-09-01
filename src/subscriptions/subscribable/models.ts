import { Dictionary } from "@/common";
import { NumericIdentityManager } from "@/identities";

import { ISubscribable } from "./interfaces";
import { Subscription } from "./types";

/**
 * Ready-to-use {@link ISubscribable} implementation. Call {@link notifyData} to
 * push a payload to every current subscriber.
 * @typeParam TData Type of the payload delivered to subscribers.
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

  /**
   * Registers a subscriber.
   * @param subscription Callback invoked on every {@link notifyData} call.
   * @returns the id to pass to {@link unsubscribe}.
   */
  public subscribe(subscription: Subscription<TData>): number {
    const id = this.identityManager.newValue();
    this.subscriptions[id] = subscription;
    return id;
  }
  /**
   * Removes a previously registered subscriber.
   * @param id Id returned by {@link subscribe}.
   */
  public unsubscribe(id: number): void {
    delete this.subscriptions[id];
  }
}
