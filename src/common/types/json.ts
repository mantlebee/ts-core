/**
 * Value that survives a `JSON.stringify` / `JSON.parse` round trip unchanged:
 * strings, finite numbers, booleans, `null`, lists and plain objects of JSON
 * values. Use {@link isJsonValue} to check an unknown value at runtime.
 *
 * The list member is written `JsonValue[]`, the same type as
 * `List<JsonValue>`: a type alias cannot reference itself through another
 * generic alias.
 */
export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { readonly [key: string]: JsonValue };
