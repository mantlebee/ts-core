import { Any } from "@/common";

import { LogTypes } from "./contants";

export interface ILogger {
  log(type: LogTypes, message: string, data?: Any): void;
  logDebug(message: string, data?: Any): void;
  logError(message: string, data?: Any): void;
  logInfo(message: string, data?: Any): void;
  logSuccess(message: string, data?: Any): void;
  logWarning(message: string, data?: Any): void;
}
