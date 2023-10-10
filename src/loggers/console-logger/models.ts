import { Logger } from "../models";
import { logOnConsole } from "./utils";

/**
 * Logger implementation to log on console.
 */
export class ConsoleLogger extends Logger {
  public constructor() {
    super(logOnConsole);
  }
}
