import { Any } from "@/common";

/**
 * Generates a random integer/float number between the given min and max values, max included.
 * To return an integer leave `decimals` to 0.
 * If `decimals` is greater than 0, the max value will be an integer anyway.
 * @param max Maximum number that can be generated.
 * @param min Minimum number that can be generated.
 * @param decimals Digits after the decimals point.
 * @returns a random number between min and max, max included.
 */
export function generateRandomNumber(
  max: number,
  min = 0,
  decimals = 0
): number {
  if (max === min) return max;
  const random = Math.random() * (max - min + 1) + min;
  if (decimals) {
    if (random >= max) return max;
    return parseFloat(random.toFixed(decimals));
  } else {
    return Math.floor(random);
  }
}

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
