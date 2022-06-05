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
 * Generates a guid.
 * @returns a guid.
 */
export function generateGuid(): string {
  var d = new Date().getTime(); //Timestamp
  var d2 = (performance && performance.now && performance.now() * 1000) || 0; //Time in microseconds since page-load or 0 if unsupported
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = Math.random() * 16; //random number between 0 and 16
    if (d > 0) {
      //Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      //Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
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
 * Checks if arg is an email.
 * @param arg Item to check.
 * @returns true if arg is an email.
 */
export function isEmail(arg: string): boolean {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(arg);
}

/**
 * Checks if arg is a GUID.
 * @param arg Item to check.
 * @returns true if arg is a GUID.
 */
export function isGuid(arg: string): boolean {
  return /^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/i.test(arg);
}

/**
 * Checks if arg is a string.
 * @param arg Item to check.
 * @returns true if arg is a string.
 */
export function isString(arg: Any): boolean {
  return typeof arg === "string";
}
