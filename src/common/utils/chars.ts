/**
 * Generates a string of chars converted from the provided char code range.
 * @param startIndex Starting char code.
 * @param length Count of char codes to use.
 * @returns
 */
export function getCharsFromCharCodesRange(
  startIndex: number,
  length: number
): string {
  return Array(length)
    .fill(startIndex)
    .map((item, index) => String.fromCharCode(item + index))
    .join("");
}

/**
 * Creates a lowercase string of the alphabet.
 * @returns a lowercase string of the alphabet.
 */
export function getLowercaseChars(): string {
  return getCharsFromCharCodesRange(97, 26);
}

/**
 * Creates a string of the numbers from 0 to 9.
 * @returns a string of the numbers from 0 to 9.
 */
export function getNumberChars(): string {
  return getCharsFromCharCodesRange(48, 10);
}

/**
 * Creates a uppercase string of the alphabet.
 * @returns a uppercase string of the alphabet.
 */
export function getUppercaseChars(): string {
  return getCharsFromCharCodesRange(65, 26);
}

/**
 * Creates a string with all the special chars.
 * @returns a string with all the special chars.
 */
export function getSpecialChars(): string {
  return (
    getCharsFromCharCodesRange(32, 16) +
    getCharsFromCharCodesRange(58, 7) +
    getCharsFromCharCodesRange(94, 3) +
    getCharsFromCharCodesRange(123, 4)
  );
}
