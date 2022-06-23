import { Dictionary } from "@/common";
import { NumericIdentityManager } from "@/identities";

import { ISubscribable } from "./interfaces";
import { Subscription } from "./types";

export class Subscribable<TData> implements ISubscribable<TData> {
  private identityManager = new NumericIdentityManager();
  private subscriptions: Dictionary<Subscription<TData>> = {};

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
