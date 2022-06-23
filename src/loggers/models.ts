import { LoggerTypes } from "./contants";
import { ILogger } from "./interfaces";
import { LogDelegate } from "./types";

export class Logger implements ILogger {
  private logDelegate: LogDelegate;

  public constructor(logDelegate: LogDelegate) {
    this.logDelegate = logDelegate;
  }

  public log(type: LoggerTypes, message: string, data?: any): void {
    this.logDelegate(type, message, data);
  }
  public logDebug(message: string, data?: any): void {
    this.log(LoggerTypes.debug, message, data);
  }
  public logError(message: string, data?: any): void {
    this.log(LoggerTypes.error, message, data);
  }
  public logInfo(message: string, data?: any): void {
    this.log(LoggerTypes.info, message, data);
  }
  public logSuccess(message: string, data?: any): void {
    this.log(LoggerTypes.success, message, data);
  }
  public logWarning(message: string, data?: any): void {
    this.log(LoggerTypes.warning, message, data);
  }
}
