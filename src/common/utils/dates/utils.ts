import { Any } from "@/common";

/**
 * Checks if arg is a date.
 * @param arg Item to check.
 * @returns true if arg is a date.
 */
export function isDate(arg: Any): boolean {
  return arg instanceof Date;
}
