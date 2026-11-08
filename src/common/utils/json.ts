import { JsonValue } from "../types";
import { isArray } from "./arrays";
import { isObject } from "./objects";

/**
 * Checks if value is a {@link JsonValue}, i.e. if it survives a
 * `JSON.stringify` / `JSON.parse` round trip unchanged. Lists and plain
 * objects are checked recursively.
 *
 * Rejected, at any depth: `undefined` (also as a property value or a list
 * item, including the holes of sparse lists), functions, symbols, bigints,
 * `NaN`, `Infinity`, `-Infinity`, `Date`s and any other non-plain object
 * (class instances, `Map`, `Set`, `RegExp`, …), and cyclic structures. The same
 * object referenced twice without a cycle is accepted.
 * @example
 * ```ts
 * isJsonValue({ a: [1, "x", null, { b: true }] }) // true
 * isJsonValue({ a: undefined })                   // false
 * isJsonValue(new Date())                         // false
 * isJsonValue(NaN)                                // false
 * ```
 * @param value Value to check.
 * @returns true if value is a JSON value.
 */
export function isJsonValue(value: unknown): value is JsonValue {
  return isJsonValueWithin(value, new Set());
}

/**
 * Recursive step of {@link isJsonValue}.
 * @param value Value to check.
 * @param ancestors Lists and objects that contain value, to detect cycles.
 * @returns true if value is a JSON value.
 */
function isJsonValueWithin(value: unknown, ancestors: Set<object>): boolean {
  if (value === null) return true;
  switch (typeof value) {
    case "string":
    case "boolean":
      return true;
    case "number":
      return Number.isFinite(value);
    case "object":
      break;
    default:
      return false;
  }
  const container = value as object;
  if (ancestors.has(container)) return false;
  let items: unknown[];
  if (isArray(container)) {
    const list = container as unknown[];
    items = [];
    for (let i = 0; i < list.length; i++) {
      if (!(i in list)) return false;
      items.push(list[i]);
    }
  } else if (isObject(container))
    items = Object.values(container as Record<string, unknown>);
  else return false;
  ancestors.add(container);
  const isValid = items.every((a) => isJsonValueWithin(a, ancestors));
  ancestors.delete(container);
  return isValid;
}
