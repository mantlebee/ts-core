import { Any } from "@/common";

import { LoggerTypes } from "./contants";

export interface ILogger {
  log(type: LoggerTypes, message: string, data?: Any): void;
  logDebug(message: string, data?: Any): void;
  logError(message: string, data?: Any): void;
  logInfo(message: string, data?: Any): void;
  logSuccess(message: string, data?: Any): void;
  logWarning(message: string, data?: Any): void;
}
