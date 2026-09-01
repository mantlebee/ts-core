import { KeyOf, Dictionary, List, Any, IDisposable } from "@/common";

/**
 * Callback invoked when its event is triggered, receiving the exact argument
 * tuple declared for that event in {@link EventsDefinition}.
 * @typeParam TEvents Event map the handler belongs to.
 * @typeParam TKey Name of the event the handler listens to.
 */
export type EventHandler<
  TEvents extends EventsDefinition,
  TKey extends KeyOf<TEvents>,
> = (...args: TEvents[TKey]) => void;

/**
 * Shape of the event map given to an {@link IEventBus}: each key is an event
 * name and its value is the tuple of arguments handlers of that event receive.
 * @example
 * ```ts
 * type AppEvents = {
 *   login: [userId: string];
 *   logout: [];
 *   scoreChanged: [previous: number, current: number];
 * };
 * ```
 */
export type EventsDefinition = Dictionary<List<Any>>;

/**
 * Handle returned by {@link IEventBus.on}; call {@link IDisposable.dispose} on it
 * to remove that single subscription.
 */
export type EventSubscription = IDisposable;
