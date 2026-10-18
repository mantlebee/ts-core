import { EventsDefinition, IEventBus } from "@/subscriptions";

/**
 * WebSocket connection exposed as a typed {@link IEventBus}: received messages
 * are raised as events (see {@link WebSocketEvents}) and {@link trigger} sends
 * them to the server.
 * @typeParam TEvents `{ eventName: argsTuple }` map defining the available events.
 */
export interface IWebSocket<TEvents extends EventsDefinition>
  extends IEventBus<TEvents> {
  /** True while the connection is open. */
  readonly connected: boolean;
  /**
   * Opens the connection.
   * @returns a promise resolved once the connection is open.
   */
  connect(): Promise<void>;
}
