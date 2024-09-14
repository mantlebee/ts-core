import { Any } from "@/common";

/**
 * Checks if arg is an object.
 * What is considered an object?
 * - {}
 * - class' instance
 * What is NOT considered an object?
 * - undefined
 * - null
 * - boolean
 * - number
 * - string
 * - function
 * - array
 * - class
 * @param arg Item to check.
 * @returns true if arg is an object.
 */
export function isObject(arg: Any): boolean {
  return Boolean(
    typeof arg === "object" && arg instanceof Object && !(arg instanceof Array)
  );
}

/**
 * Checks if the given object has the given key.
 * @example
 * ```ts
 * objectHasKey({name: "John"}, "name")     // true
 * objectHasKey({name: "John"}, "surname")  // false
 * ```
 * @param obj Object to check for the key.
 * @param key Key to search in the object.
 * @returns true if the object has the key.
 */
export function objectHasKey(obj: Any, key: string): boolean {
  return Object.keys(obj).includes(key);
}
