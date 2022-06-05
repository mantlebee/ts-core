import { Any, List, Stringable } from "@/common";

/**
 * Formats a string replacing the placeholders with the given values.
 * ```javascript
 * formatString("Hi {0}, this is {1}. Goodbye, {0}.", "John", "Jane")
 * // "Hi John, this is Jane. Goodbye, John."
 * ```
 * @param str String to format.
 * @param args List of values to insert in the string.
 * @returns a formatted string with given values.
 */
export function formatString(str: string, ...args: List<Stringable>) {
  // use replace to iterate over the string
  // select the match and check if related argument is present
  // if yes, replace the match with the argument
  // check if the argument is present
  return str.replace(/{([0-9]+)}/g, (match, index) =>
    typeof args[index] == "undefined" ? match : args[index].toString()
  );
}

/**
 * Generates a random string from the given chars and of the given length.
 * @param chars List of chars from which to generate the string.
 * @param length Length of the string to generate.
 * @returns a random string.
 */
export function generateRandomString(chars: string, length: number): string {
  let str = "";
  for (let i = 0; i < length; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return str;
}

/**
 * Checks if arg is a string.
 * @param arg Item to check.
 * @returns true if arg is a string.
 */
export function isString(arg: Any): boolean {
  return typeof arg === "string";
}
