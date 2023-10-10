import { Any } from "@/common";

import { LogTypes } from "../contants";

/**
 * Logs on console, choosing the log type by the {@link type} parameter.
 * @param type Type of log.
 * @param message Message of the log.
 * @param data Data to log.
 */
export function logOnConsole(
  type: LogTypes,
  message: string,
  data?: Any
): void {
  switch (type) {
    case LogTypes.debug:
      console.debug(message, data);
      break;
    case LogTypes.error:
      console.error(message, data);
      break;
    case LogTypes.info:
      console.info(message, data);
      break;
    case LogTypes.success:
      console.log(message, data);
      break;
    case LogTypes.warning:
      console.warn(message, data);
      break;
    default:
      console.log(message, data);
      break;
  }
}
