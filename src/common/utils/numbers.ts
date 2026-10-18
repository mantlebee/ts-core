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
 * Checks if a number is integer.
 * @param numb Number to check.
 * @returns true if number is integer.
 */
export function numberIsInteger(numb: number): boolean {
  return numb % 1 == 0;
}

/**
 * Rounds a number, keeping a number of decimals equal to the decimals parameter.
 * Reference: https://medium.com/swlh/how-to-round-to-a-certain-number-of-decimal-places-in-javascript-ed74c471c1b8
 * @param numb Number to round.
 * @param decimals Number of decimals to keep.
 * @returns a rounded number with N decimals.
 */
export function roundNumber(numb: number, decimals = 0): number {
  if (!Number.isFinite(numb)) return numb;
  return shiftDecimalPoint(
    Math.round(shiftDecimalPoint(numb, decimals)),
    -decimals
  );
}

/**
 * Multiplies a number by `10^exponent` working on its string representation,
 * so no floating point error is introduced. Numbers already written in
 * exponential notation (e.g. `1e-7`, `1e21`) are handled too.
 */
function shiftDecimalPoint(numb: number, exponent: number): number {
  const [mantissa, numbExponent = "0"] = `${numb}`.split("e");
  return Number(`${mantissa}e${Number(numbExponent) + exponent}`);
}
