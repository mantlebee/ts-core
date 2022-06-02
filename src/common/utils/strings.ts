import { List, Stringable } from "@/common";

/**
 * Formats a string replacing the placeholders with the given values.
 * ```javascript
 * formatString("Hi {0}, this is {1}. Goodbye, {0}.", "John", "Jane")
 * // "Hi John, this is Jane. Goodbye, John."
 * ```
 * @param str String to format.
 * @param args List of values to insert in the string
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
