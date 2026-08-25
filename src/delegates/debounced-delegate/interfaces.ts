import { List } from "@/common";

/**
 * Represents a class with the purpose of preventing multiple and repetitive executions of a function.
 */
export interface IDebouncedDelegate {
  call(...args: List<unknown>): void;
}
