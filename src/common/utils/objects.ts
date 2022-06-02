import { Any } from "@/common";

/**
 * Check if the given object has the given key.
 * ```javascript
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
