import { LogTypes } from "../contants";

/**
 * Payload delivered to {@link SubscribableLogger} subscribers for each log entry.
 */
export type SubscribableLoggerData = {
  /** Severity/category of the entry. */
  type: LogTypes;
  /** Logged message. */
  message: string;
  /** Data attached to the entry, if any. */
  data?: any;
};
