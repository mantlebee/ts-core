import { Any, Dictionary, isObject } from "@/common";

import { isUnsafeKey } from "../nested/utils";

/**
 * Recursively copies plain objects and arrays; returns anything else as-is.
 * Own `__proto__` keys (e.g. from `JSON.parse`) are dropped: assigning them
 * would replace the copy's prototype.
 */
export function deepClone<T>(value: T): T {
  if (Array.isArray(value)) return value.map((item) => deepClone(item)) as T;
  if (isObject(value)) {
    const clone: Dictionary = {};
    for (const key of Object.keys(value as Dictionary)) {
      if (isUnsafeKey(key)) continue;
      clone[key] = deepClone((value as Dictionary)[key]);
    }
    return clone as T;
  }
  return value as Any;
}
