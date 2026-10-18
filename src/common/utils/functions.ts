import { Any } from "../types";

/**
 * Checks if arg is a function.
 * What is considered a function?
 * - () => {}
 * - function () {}
 * - class' method
 * - bound and built-in functions without a prototype (e.g. `Math.max`)
 * What is NOT considered a function?
 * - class' constructor (`class A {}`)
 * - built-in constructors (`Error`, `Date`, …)
 * @param arg Item to check.
 * @returns true if arg is a function.
 */
export function isFunction(arg: Any): boolean {
  if (typeof arg !== "function") return false;
  // Arrow functions, methods and bound functions have no prototype.
  if (!arg.prototype) return true;
  const source = Function.prototype.toString.call(arg);
  return !/^class\b/.test(source) && !/\[native code\]\s*\}$/.test(source);
}
