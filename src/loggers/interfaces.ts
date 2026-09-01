import { Any } from "@/common";

import { LogTypes } from "./contants";

/**
 * Logs messages, optionally with attached data, at different severity levels.
 */
export interface ILogger {
  /**
   * Logs a message at the given level.
   * @param type Severity/category of the entry.
   * @param message Message to log.
   * @param data Optional data to attach to the entry.
   */
  log(type: LogTypes, message: string, data?: Any): void;
  /**
   * Logs a message at {@link LogTypes.debug} level.
   * @param message Message to log.
   * @param data Optional data to attach to the entry.
   */
  logDebug(message: string, data?: Any): void;
  /**
   * Logs a message at {@link LogTypes.error} level.
   * @param message Message to log.
   * @param data Optional data to attach to the entry.
   */
  logError(message: string, data?: Any): void;
  /**
   * Logs a message at {@link LogTypes.info} level.
   * @param message Message to log.
   * @param data Optional data to attach to the entry.
   */
  logInfo(message: string, data?: Any): void;
  /**
   * Logs a message at {@link LogTypes.success} level.
   * @param message Message to log.
   * @param data Optional data to attach to the entry.
   */
  logSuccess(message: string, data?: Any): void;
  /**
   * Logs a message at {@link LogTypes.warning} level.
   * @param message Message to log.
   * @param data Optional data to attach to the entry.
   */
  logWarning(message: string, data?: Any): void;
}
