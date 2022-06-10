import { Any } from "@/common";

/**
 * Checks if arg is a boolean.
 * @param arg Item to check.
 * @returns true if arg is a boolean.
 */
export function isBoolean(arg: Any): boolean {
  return typeof arg === "boolean";
}
