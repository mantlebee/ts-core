import { ISubscribable, Subscribable, Subscription } from "@/subscriptions";

import { ILogger } from "../interfaces";
import { Logger } from "../models";
import { SubscribableLoggerData } from "./types";

/**
 * {@link Logger} that, instead of writing anywhere, notifies its subscribers
 * with every log entry as {@link SubscribableLoggerData}.
 */
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

  /**
   * Registers a subscriber that receives every subsequent log entry.
   * @param subscription Function called with each log entry.
   * @returns the id to pass to {@link unsubscribe}.
   */
  public subscribe(subscription: Subscription<SubscribableLoggerData>): number {
    return this._subscribable.subscribe(subscription);
  }
  /**
   * Removes a previously registered subscriber.
   * @param id Id returned by {@link subscribe}.
   */
  public unsubscribe(id: number): void {
    this._subscribable.unsubscribe(id);
  }
}
