import { List } from "@/common";

/**
 * Represents a class with the purpose of preventing multiple and repetitive executions of a function.
 */
export interface IDebouncedDelegate {
  /**
   * Schedules the debounced function; each call restarts the wait.
   * @param args Arguments forwarded to the debounced function on the last call.
   */
  call(...args: List<unknown>): void;
}
