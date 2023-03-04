import { Any } from "@/common";

import { LoggerTypes } from "./contants";
import { ILogger } from "./interfaces";
import { LogDelegate } from "./types";

export class Logger implements ILogger {
  public constructor(private readonly logDelegate: LogDelegate) {
    this.logDelegate = logDelegate;
  }

  public log(type: LoggerTypes, message: string, data?: Any): void {
    this.logDelegate(type, message, data);
  }
  public logDebug(message: string, data?: Any): void {
    this.log(LoggerTypes.debug, message, data);
  }
  public logError(message: string, data?: Any): void {
    this.log(LoggerTypes.error, message, data);
  }
  public logInfo(message: string, data?: Any): void {
    this.log(LoggerTypes.info, message, data);
  }
  public logSuccess(message: string, data?: Any): void {
    this.log(LoggerTypes.success, message, data);
  }
  public logWarning(message: string, data?: Any): void {
    this.log(LoggerTypes.warning, message, data);
  }
}
