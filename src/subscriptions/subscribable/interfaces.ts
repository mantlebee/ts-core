import { IDisposable } from "@/common";

import { EventsDefinition, IEventBus } from "../event-bus";

/**
 * Something that exposes typed events to the outside: consumers can only
 * listen with {@link IEventBus.on}, while raising the events is up to the
 * implementation. Disposing it removes every handler.
 * @typeParam TEvents `{ eventName: argsTuple }` map defining the available events.
 */
export interface ISubscribable<TEvents extends EventsDefinition>
  extends IDisposable,
    Pick<IEventBus<TEvents>, "on"> {}
