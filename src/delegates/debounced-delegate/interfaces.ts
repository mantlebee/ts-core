import { List } from "@/common";

/**
 * Represents a class with the purpose of preventing multiple and repetitive executions of a function.
 */
export interface IDebouncedDelegate {
  /** `true` while a call is scheduled and not yet executed. */
  readonly isPending: boolean;
  /**
   * Cancels the scheduled call, if any: the debounced function will not run
   * until {@link call} is called again.
   */
  abort(): void;
  /**
   * Schedules the debounced function; each call restarts the wait.
   * @param args Arguments forwarded to the debounced function on the last call.
   */
  call(...args: List<unknown>): void;
}
