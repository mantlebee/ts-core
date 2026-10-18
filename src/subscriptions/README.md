# `subscriptions`

**Publish/subscribe primitives.** Register a typed handler, get a disposable
subscription back, dispose it to unregister.

## What's in here

- **`event-bus/`** — `IEventBus<TEvents>` / `EventBus<TEvents>`: many named,
  typed channels. `TEvents` is an `{ eventName: argsTuple }` map, so `on(event,
  handler)` and `trigger(event, ...args)` are checked at compile time.
  `on()` returns an `EventSubscription` (an `IDisposable`); `dispose()` it to
  remove that single handler.
  - **`multi-tab/`** — `MultiTabEventBus<TEvents>`: an `EventBus` whose
    triggers are also delivered to the other browser tabs of the same origin,
    through an `IStorage` (default [`LocalStorage`](../storage)) and the
    `storage` window event. Browser only.
- **`subscribable/`** — `ISubscribable<TEvents>` / `Subscribable<TEvents>`:
  exposes only `on()` (and `dispose()`) to the outside, while the subclass
  raises its events through the protected `_eventBus`.
