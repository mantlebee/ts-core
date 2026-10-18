/**
 * Basic events of an {@link IWebSocket}: a single `message` event carrying the
 * received message.
 * @typeParam TMessage Type of the messages.
 */
export type WebSocketEvents<TMessage> = {
  message: [message: TMessage];
};
