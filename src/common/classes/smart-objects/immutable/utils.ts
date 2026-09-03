import { Any, Dictionary, isObject } from "@/common";

/** Recursively copies plain objects and arrays; returns anything else as-is. */
export function deepClone<T>(value: T): T {
  if (Array.isArray(value)) return value.map((item) => deepClone(item)) as T;
  if (isObject(value)) {
    const clone: Dictionary = {};
    for (const key of Object.keys(value as Dictionary)) {
      clone[key] = deepClone((value as Dictionary)[key]);
    }
    return clone as T;
  }
  return value as Any;
}
