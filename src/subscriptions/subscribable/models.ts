import { KeyOf } from "@/common";

import {
  EventBus,
  EventHandler,
  EventsDefinition,
  EventSubscription,
} from "../event-bus";
import { ISubscribable } from "./interfaces";

/**
 * Base {@link ISubscribable} implementation, backed by an {@link EventBus}.
 * Subclasses raise their events with `this._eventBus.trigger(...)`.
 * @example
 * ```ts
 * class Counter extends Subscribable<{ changed: [value: number] }> {
 *   private value = 0;
 *   public increment() {
 *     this._eventBus.trigger("changed", ++this.value);
 *   }
 * }
 * const subscription = new Counter().on("changed", (value) => console.log(value));
 * ```
 * @typeParam TEvents `{ eventName: argsTuple }` map defining the available events.
 */
export class Subscribable<TEvents extends EventsDefinition>
  implements ISubscribable<TEvents>
{
  /** Bus used to register handlers and to raise the events. */
  protected _eventBus = new EventBus<TEvents>();

  /**
   * Removes every registered handler.
   */
  public dispose(): Promise<void> {
    return this._eventBus.dispose();
  }

  /**
   * Registers a handler for an event.
   * @typeParam TKey Name of the event to listen to.
   * @param event Event to subscribe to.
   * @param handler Callback invoked every time `event` is raised.
   * @returns a subscription; dispose it to remove this single handler.
   */
  public on<TKey extends KeyOf<TEvents>>(
    event: TKey,
    handler: EventHandler<TEvents, TKey>
  ): EventSubscription {
    return this._eventBus.on(event, handler);
  }
}
