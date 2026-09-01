import { LogTypes } from "./contants";

/**
 * Function that writes a single log entry.
 * @param type Severity/category of the entry.
 * @param message Message to log.
 * @param data Optional data to attach to the entry.
 */
export type LogDelegate = (type: LogTypes, message: string, data?: any) => void;
