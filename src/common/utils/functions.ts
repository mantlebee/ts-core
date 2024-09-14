import { Any } from "../types";
/**
 * Checks if arg is a function.
 * What is considered a function?
 * - () => {}
 * - class' method
 * What is NOT considered a function?
 * - class' constructor
 * @param arg Item to check.
 * @returns true if arg is a function.
 */
export function isFunction(arg: Any): boolean {
  return Boolean(
    arg instanceof Function && (!arg.prototype || !arg.prototype.constructor)
  );
}
