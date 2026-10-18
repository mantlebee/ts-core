import { KeyOf } from "@/common";
import {
  EventBus,
  EventHandler,
  EventSubscription,
  ISubscribable,
} from "@/subscriptions";

import { ILogger } from "../interfaces";
import { Logger } from "../models";
import { SubscribableLoggerEvents } from "./types";

/**
 * {@link Logger} that, instead of writing anywhere, raises the `log` event with
 * every entry as {@link SubscribableLoggerData}.
 * @example
 * ```ts
 * const logger = new SubscribableLogger();
 * const subscription = logger.on("log", ({ type, message }) => ...);
 * logger.logInfo("Hello");
 * await subscription.dispose();
 * ```
 */
export class SubscribableLogger
  extends Logger
  implements ILogger, ISubscribable<SubscribableLoggerEvents>
{
  private _eventBus = new EventBus<SubscribableLoggerEvents>();

  public constructor() {
    super((type, message, data) =>
      this._eventBus.trigger("log", { type, message, data })
    );
  }

  /**
   * Removes every registered handler.
   */
  public dispose(): Promise<void> {
    return this._eventBus.dispose();
  }

  /**
   * Registers a handler that receives every subsequent log entry.
   * @param event Event to subscribe to (`log`).
   * @param handler Function called with each log entry.
   * @returns a subscription; dispose it to remove this single handler.
   */
  public on<TKey extends KeyOf<SubscribableLoggerEvents>>(
    event: TKey,
    handler: EventHandler<SubscribableLoggerEvents, TKey>
  ): EventSubscription {
    return this._eventBus.on(event, handler);
  }
}
