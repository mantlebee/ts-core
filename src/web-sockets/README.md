# `web-sockets`

**Contract of a WebSocket connection exposed as a typed event bus.** Types only:
implementations depend on the transport library.

## What's in here

- **`interfaces.ts`** — `IWebSocket<TEvents>`: an
  [`IEventBus`](../subscriptions) with `connected` and `connect()`.
- **`types.ts`** — `WebSocketEvents<TMessage>`: a single `message` event.
