import { Logger } from "../models";
import { logOnConsole } from "./utils";

/**
 * {@link Logger} implementation that writes entries to the console, mapping each
 * {@link LogTypes} to the matching `console` method.
 */
export class ConsoleLogger extends Logger {
  public constructor() {
    super(logOnConsole);
  }
}
