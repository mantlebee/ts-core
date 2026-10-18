import { List } from "@/common";

/**
 * Sends notifications to the user (toasts, snackbars, alerts, …), one method
 * per {@link LogTypes} level. Where and how they are shown is up to the
 * implementation.
 */
export interface INotifier {
  /**
   * Sends a debug notification.
   * @param args Content of the notification (e.g. message, title).
   */
  notifyDebug(...args: List<unknown>): void;
  /**
   * Sends an error notification.
   * @param args Content of the notification (e.g. message, title).
   */
  notifyError(...args: List<unknown>): void;
  /**
   * Sends an info notification.
   * @param args Content of the notification (e.g. message, title).
   */
  notifyInfo(...args: List<unknown>): void;
  /**
   * Sends a success notification.
   * @param args Content of the notification (e.g. message, title).
   */
  notifySuccess(...args: List<unknown>): void;
  /**
   * Sends a warning notification.
   * @param args Content of the notification (e.g. message, title).
   */
  notifyWarning(...args: List<unknown>): void;
}
