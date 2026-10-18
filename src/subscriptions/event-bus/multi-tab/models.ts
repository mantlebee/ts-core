import { KeyOf } from "@/common";
import { IStorage, LocalStorage } from "@/storage";

import { IEventBus } from "../interfaces";
import { EventBus } from "../models";
import { EventsDefinition } from "../types";
import { MultiTabEventBusOptions } from "./types";

/**
 * {@link EventBus} whose events are delivered to the other browser tabs of the
 * same origin: {@link trigger} writes the arguments in a shared storage, and
 * the other tabs receive them through the `storage` window event.
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
  private readonly _notifyCurrentTab: boolean;
  private readonly _storage: IStorage;
  private readonly _storageListener = (event: StorageEvent) =>
    this.onStorageEvent(event);

  /**
   * @param options Notification of the current tab and shared storage.
   */
  public constructor(options?: MultiTabEventBusOptions) {
    super();
    this._notifyCurrentTab = options?.notifyCurrentTab ?? false;
    this._storage = options?.storage ?? new LocalStorage();
    window.addEventListener("storage", this._storageListener);
  }

  /**
   * Removes every handler and the `storage` window listener.
   */
  public async dispose(): Promise<void> {
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
  public trigger<TKey extends KeyOf<TEvents>>(
    event: TKey,
    ...args: TEvents[TKey]
  ): void {
    this._storage.set(event, args);
    if (this._notifyCurrentTab) super.trigger(event, ...args);
  }

  private onStorageEvent({ key }: StorageEvent): void {
    const event = key as KeyOf<TEvents>;
    if (!this._handlersMap[event]) return;
    const args = this._storage.get<TEvents[KeyOf<TEvents>]>(event);
    if (Array.isArray(args)) super.trigger(event, ...args);
  }
}
