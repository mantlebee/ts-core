import { IStorage } from "@/storage";

/**
 * Options of a {@link MultiTabEventBus}.
 */
export type MultiTabEventBusOptions = {
  /**
   * Prefix of the storage keys the events are written under, so they don't
   * collide with the other keys of the storage. Default
   * {@link MultiTabEventBusKeyPrefixDefault}.
   */
  keyPrefix?: string;
  /**
   * If true, {@link MultiTabEventBus.trigger} notifies the handlers of the
   * current tab too. Default `false`: only the other tabs are notified, through
   * the `storage` window event.
   */
  notifyCurrentTab?: boolean;
  /**
   * Storage shared between the tabs, default {@link LocalStorage}.
   */
  storage?: IStorage;
};

/**
 * Value written in the storage for every {@link MultiTabEventBus.trigger}.
 * The `id` changes on every trigger: the `storage` event is raised only when
 * the stored value changes, so repeating an event with the same arguments
 * would not reach the other tabs otherwise.
 */
export type MultiTabEventBusMessage = {
  /** Arguments of the event. */
  args: unknown[];
  /** Unique id of the trigger. */
  id: string;
};
