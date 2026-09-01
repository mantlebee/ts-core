import { Any, List, Stringable } from "@/common";

/**
 * Produces a short, deterministic hash string for any serializable value.
 *
 * Strings are hashed as-is; any other value is first serialized with
 * `JSON.stringify` (falling back to `String(data)` for values that do not
 * serialize, such as `undefined` or functions). The digest is a 32-bit
 * djb2-style hash rendered as an 8-character, zero-padded, lowercase hex string.
 *
 * It is **not** cryptographic: use it for cache keys, change detection or
 * bucketing, never for security. Structurally equal inputs hash to the same
 * value only when they serialize identically (e.g. object key order matters).
 * @example
 * ```ts
 * createHash("hello")                          // "05e918d2" (stable across calls)
 * createHash({ id: 1 }) === createHash({ id: 1 }) // true
 * createHash([1, 2]) === createHash([2, 1])       // false
 * ```
 * @param data Value to hash.
 * @returns an 8-character lowercase hex hash of data.
 */
export function createHash(data: Any): string {
  const input = isString(data) ? data : (JSON.stringify(data) ?? String(data));
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    // djb2: hash * 31 + charCode, kept within a signed 32-bit integer.
    hash = (input.charCodeAt(i) + ((hash << 5) - hash)) | 0;
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
}

/**
 * Converts a string into a slug.
 * @param str String to convert into a slug.
 * @returns the slug version of str.
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
    typeof args[index] == "undefined" ? match : args[index].toString(),
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
      r = ((d + r) % 16) | 0;
      d = Math.floor(d / 16);
    } else {
      //Use microseconds since page-load if supported
      r = ((d2 + r) % 16) | 0;
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
    arg,
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
