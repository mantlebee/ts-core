import { KeyOf } from "@/common";
import { IStorage, LocalStorage } from "@/storage";

import { IEventBus } from "../interfaces";
import { EventBus } from "../models";
import { EventsDefinition } from "../types";
import { MultiTabEventBusMessage, MultiTabEventBusOptions } from "./types";

/**
 * Default prefix of the storage keys of a {@link MultiTabEventBus}.
 */
export const MultiTabEventBusKeyPrefixDefault = "multi-tab-event-bus:";

let triggerCounter = 0;

/**
 * {@link EventBus} whose events are delivered to the other browser tabs of the
 * same origin: {@link trigger} writes the arguments in a shared storage (under
 * the key `<keyPrefix><event>`, together with a unique id, so even identical
 * triggers are delivered), and the other tabs receive them through the
 * `storage` window event.
 * Browser only.
 * @example
 * ```ts
 * const bus = new MultiTabEventBus<{ signedOut: [] }>();
 * bus.on("signedOut", () => location.reload()); // raised by the other tabs
 * bus.trigger("signedOut");
 * ```
 * @typeParam TEvents `{ eventName: argsTuple }` map defining the available events.
 */
export class MultiTabEventBus<TEvents extends EventsDefinition>
  extends EventBus<TEvents>
  implements IEventBus<TEvents>
{
  private readonly _keyPrefix: string;
  private readonly _notifyCurrentTab: boolean;
  private readonly _storage: IStorage;
  private readonly _storageListener = (event: StorageEvent) =>
    this.onStorageEvent(event);

  /**
   * @param options Notification of the current tab and shared storage.
   */
  public constructor(options?: MultiTabEventBusOptions) {
    super();
    this._keyPrefix = options?.keyPrefix ?? MultiTabEventBusKeyPrefixDefault;
    this._notifyCurrentTab = options?.notifyCurrentTab ?? false;
    this._storage = options?.storage ?? new LocalStorage();
    window.addEventListener("storage", this._storageListener);
  }

  /**
   * Removes every handler and the `storage` window listener.
   */
  public override async dispose(): Promise<void> {
    window.removeEventListener("storage", this._storageListener);
    await super.dispose();
  }

  /**
   * Notifies the other tabs (through the `storage` event) and, when
   * `notifyCurrentTab` is true, the current tab too.
   * @typeParam TKey Name of the event to raise.
   * @param event Event to raise.
   * @param args Arguments forwarded to each handler, as declared for `event`.
   */
  public override trigger<TKey extends KeyOf<TEvents>>(
    event: TKey,
    ...args: TEvents[TKey]
  ): void {
    const message: MultiTabEventBusMessage = {
      args,
      id: `${Date.now().toString(36)}-${(++triggerCounter).toString(36)}-${Math.random().toString(36).slice(2)}`,
    };
    this._storage.set(this._keyPrefix + event, message);
    if (this._notifyCurrentTab) super.trigger(event, ...args);
  }

  private onStorageEvent({ key }: StorageEvent): void {
    if (!key?.startsWith(this._keyPrefix)) return;
    const event = key.slice(this._keyPrefix.length) as KeyOf<TEvents>;
    if (!this._handlersMap[event]) return;
    const message = this._storage.get<MultiTabEventBusMessage>(key);
    if (Array.isArray(message?.args))
      super.trigger(event, ...(message.args as TEvents[KeyOf<TEvents>]));
  }
}
