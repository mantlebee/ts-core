import { Any } from "@/common";

import { LogTypes } from "./contants";
import { ILogger } from "./interfaces";
import { LogDelegate } from "./types";

export class Logger implements ILogger {
  private readonly _logDelegate: LogDelegate;

  public constructor(logDelegate: LogDelegate) {
    this._logDelegate = logDelegate;
  }

  public log(type: LogTypes, message: string, data?: Any): void {
    this._logDelegate(type, message, data);
  }
  public logDebug(message: string, data?: Any): void {
    this.log(LogTypes.debug, message, data);
  }
  public logError(message: string, data?: Any): void {
    this.log(LogTypes.error, message, data);
  }
  public logInfo(message: string, data?: Any): void {
    this.log(LogTypes.info, message, data);
  }
  public logSuccess(message: string, data?: Any): void {
    this.log(LogTypes.success, message, data);
  }
  public logWarning(message: string, data?: Any): void {
    this.log(LogTypes.warning, message, data);
  }
}
