import { Any, List, Stringable } from "@/common";

/**
 * Convert a string into a slug.
 * @param str String to convert into a slug.
 * @returns the slug version of the {@link str} parameter.
 */
export function createSlug(str: string): string {
  // trim all kind of whitespaces (\n, \t, etc.)
  str = str.replace(/^\s+|\s+$/g, "");
  str = str.toLowerCase();
  // remove accents, swap ñ for n, etc
  const from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
  const to = "aaaaaeeeeeiiiiooooouuuunc------";
  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }
  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-"); // collapse dashes
  return str;
}

/**
 * Formats a string, replacing the placeholders with the given values.
 * @example
 * ```ts
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
 * Checks if arg is an email.
 * @param arg Item to check.
 * @returns true if arg is an email.
 */
export function isEmail(arg: string): boolean {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
    arg
  );
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
