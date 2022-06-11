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

/**
 * Rouns a number, keeping a number of decimals equal to the decimals parameter.
 * Reference: https://medium.com/swlh/how-to-round-to-a-certain-number-of-decimal-places-in-javascript-ed74c471c1b8
 * @param numb Number to round.
 * @param decimals Number of decimals to keep.
 * @returns a rounded number with N decimals.
 */
export function roundNumber(numb: number, decimals = 0): number {
  return Number(
    Math.round(parseFloat(`${numb}e${decimals}`)) + "e-" + decimals
  );
}
