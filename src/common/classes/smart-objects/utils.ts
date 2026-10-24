/**
 * True when a write to `key` would reach the object's prototype instead of an
 * own property (prototype pollution).
 */
export function isUnsafeObjectKey(key: string): boolean {
  return key === "__proto__";
}
