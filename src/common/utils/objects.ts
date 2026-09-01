import { Any } from "@/common";

/**
 * Checks if arg is a plain object.
 * What is considered an object?
 * - {}
 * - object literals / `Object.create(null)`
 * What is NOT considered an object?
 * - undefined
 * - null
 * - boolean
 * - number
 * - string
 * - function
 * - array
 * - class
 * - class' instance
 * - built-in object instances (Date, Error, RegExp, Map, Set, ...)
 * @param arg Item to check.
 * @returns true if arg is a plain object.
 */
export function isObject(arg: Any): boolean {
  if (arg === null || typeof arg !== "object" || arg instanceof Array)
    return false;
  const prototype = Object.getPrototypeOf(arg);
  return prototype === Object.prototype || prototype === null;
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
