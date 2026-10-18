import { IStorage } from "@/storage";

/**
 * Options of a {@link MultiTabEventBus}.
 */
export type MultiTabEventBusOptions = {
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
