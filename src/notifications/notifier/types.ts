import { List } from "@/common";
import { LogTypes } from "@/loggers";

/**
 * Function that actually shows a notification.
 * @param type Level of the notification.
 * @param args Content of the notification, as passed to the {@link INotifier} method.
 */
export type NotifierDelegate = (type: LogTypes, ...args: List<unknown>) => void;
