import { List } from "@/common";
import { LogTypes } from "@/loggers";

import { INotifier } from "./interfaces";
import { NotifierDelegate } from "./types";

/**
 * {@link INotifier} that forwards every notification to a
 * {@link NotifierDelegate}, together with its {@link LogTypes} level.
 * @example
 * ```ts
 * const notifier = new Notifier((type, message) => toast(message, { type }));
 * notifier.notifySuccess("Saved");
 * ```
 */
export class Notifier implements INotifier {
  /**
   * @param delegate Function that actually shows the notifications.
   */
  public constructor(private readonly delegate: NotifierDelegate) {}

  public notifyDebug(...args: List<unknown>): void {
    this.delegate(LogTypes.debug, ...args);
  }
  public notifyError(...args: List<unknown>): void {
    this.delegate(LogTypes.error, ...args);
  }
  public notifyInfo(...args: List<unknown>): void {
    this.delegate(LogTypes.info, ...args);
  }
  public notifySuccess(...args: List<unknown>): void {
    this.delegate(LogTypes.success, ...args);
  }
  public notifyWarning(...args: List<unknown>): void {
    this.delegate(LogTypes.warning, ...args);
  }
}
