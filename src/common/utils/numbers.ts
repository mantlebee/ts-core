import { Any } from "@/common";

/**
 * Checks if arg is a number.
 * @param arg Item to check.
 * @returns true if arg is a number.
 */
export function isNumber(arg: Any): boolean {
  return typeof arg === "number";
}

/**
 * Checks if a number is integer or not.
 * @param numb Number to check.
 * @returns true is number is integer.
 */
export function numberIsInteger(numb: number): boolean {
  return numb % 1 == 0;
}
