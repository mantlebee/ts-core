import { IDisposable, KeyOf } from "@/common";

import { EventHandler, EventsDefinition, EventSubscription } from "./types";

/**
 * Generic typed publish/subscribe bus. The {@link EventsDefinition} type
 * parameter ties each event name to the arguments its handlers receive, so
 * {@link on} and {@link trigger} are checked at compile time.
 * Disposing the bus drops every registered handler.
 * @typeParam TEvents `{ eventName: argsTuple }` map defining the available events.
 */
export interface IEventBus<
  TEvents extends EventsDefinition,
> extends IDisposable {
  /**
   * Registers a handler for an event.
   * @typeParam TKey Name of the event to listen to.
   * @param event Event to subscribe to.
   * @param handler Callback invoked on every {@link trigger} of `event`.
   * @returns a subscription; dispose it to remove this single handler.
   */
  on<TKey extends KeyOf<TEvents>>(
    event: TKey,
    handler: EventHandler<TEvents, TKey>,
  ): EventSubscription;
  /**
   * Synchronously invokes every handler registered for an event, in
   * subscription order.
   * @typeParam TKey Name of the event to raise.
   * @param event Event to raise.
   * @param args Arguments forwarded to each handler, as declared for `event`.
   */
  trigger<TKey extends KeyOf<TEvents>>(
    event: TKey,
    ...args: TEvents[TKey]
  ): void;
}
