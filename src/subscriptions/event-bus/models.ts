import { KeyOf } from "@/common";

import { IEventBus } from "./interfaces";
import { EventHandler, EventsDefinition, EventSubscription } from "./types";

/**
 * In-memory {@link IEventBus} implementation. Handlers are kept per event in
 * subscription order and invoked synchronously by {@link trigger}.
 * @typeParam TEvents `{ eventName: argsTuple }` map defining the available events.
 */
export class EventBus<
  TEvents extends EventsDefinition,
> implements IEventBus<TEvents> {
  /** Registered handlers, grouped by event name. */
  protected _handlersMap: {
    [key in KeyOf<TEvents>]?: EventHandler<TEvents, key>[];
  } = {};

  /**
   * Removes every registered handler, leaving the bus empty and reusable.
   */
  public async dispose(): Promise<void> {
    this._handlersMap = {};
  }

  /**
   * Registers a handler for an event.
   * @typeParam TKey Name of the event to listen to.
   * @param event Event to subscribe to.
   * @param handler Callback invoked on every {@link trigger} of `event`.
   * @returns a subscription; dispose it to remove this single handler.
   */
  public on<TKey extends KeyOf<TEvents>>(
    event: TKey,
    handler: EventHandler<TEvents, TKey>,
  ): EventSubscription {
    if (!this._handlersMap[event]) this._handlersMap[event] = [];
    this._handlersMap[event].push(handler);
    return this.createListener(event, handler);
  }
  /**
   * Synchronously invokes every handler registered for an event, in
   * subscription order. Does nothing when the event has no handlers.
   * @typeParam TKey Name of the event to raise.
   * @param event Event to raise.
   * @param args Arguments forwarded to each handler, as declared for `event`.
   */
  public trigger<TKey extends KeyOf<TEvents>>(
    event: TKey,
    ...args: TEvents[TKey]
  ) {
    this._handlersMap[event]?.forEach((a) => a(...args));
  }

  /**
   * Builds the {@link EventSubscription} returned by {@link on}.
   * @typeParam TKey Name of the subscribed event.
   * @param event Event the handler is registered for.
   * @param handler Handler the subscription removes when disposed.
   * @returns a subscription whose `dispose` unregisters `handler`.
   */
  protected createListener<TKey extends KeyOf<TEvents>>(
    event: TKey,
    handler: EventHandler<TEvents, TKey>,
  ): EventSubscription {
    return { dispose: async () => this.disposeListener(event, handler) };
  }
  /**
   * Removes a single handler, and drops the event entry entirely once its last
   * handler is gone.
   * @typeParam TKey Name of the event the handler was registered for.
   * @param event Event to remove the handler from.
   * @param handler Handler to remove.
   */
  protected disposeListener<TKey extends KeyOf<TEvents>>(
    event: TKey,
    handler: EventHandler<TEvents, TKey>,
  ): void {
    const handlers = this._handlersMap[event]?.filter((a) => a !== handler);
    if (handlers?.length) this._handlersMap[event] = handlers;
    else delete this._handlersMap[event];
  }
}
