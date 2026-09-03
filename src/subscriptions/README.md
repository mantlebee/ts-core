# `subscriptions`

**Publish/subscribe primitives.** Two flavours of the same idea — register a
callback, get a handle back, unregister with it — for different needs.

## What's in here

- **`subscribable/`** — `ISubscribable<TData>` / `Subscribable<TData>`: one
  channel. `notifyData(data)` calls every current subscriber. `subscribe()`
  returns a numeric id; `unsubscribe(id)` removes it. Ids come from a
  [`NumericIdentityManager`](../identities/identity-manager).
- **`event-bus/`** — `IEventBus<TEvents>` / `EventBus<TEvents>`: many named,
  typed channels. `TEvents` is an `{ eventName: argsTuple }` map, so `on(event,
  handler)` and `trigger(event, ...args)` are checked at compile time.
  `on()` returns an `EventSubscription` (an `IDisposable`); `dispose()` it to
  remove that single handler.
