import { ISubscribable, Subscribable, Subscription } from "@/subscriptions";

import { ILogger } from "../interfaces";
import { Logger } from "../models";
import { SubscribableLoggerData } from "./types";

export class SubscribableLogger
  extends Logger
  implements ILogger, ISubscribable<SubscribableLoggerData>
{
  private _subscribable = new Subscribable<SubscribableLoggerData>();

  public constructor() {
    super((type, message, data) =>
      this._subscribable.notifyData({ type, message, data })
    );
  }

  public subscribe(subscription: Subscription<SubscribableLoggerData>): number {
    return this._subscribable.subscribe(subscription);
  }
  public unsubscribe(id: number): void {
    this._subscribable.unsubscribe(id);
  }
}
