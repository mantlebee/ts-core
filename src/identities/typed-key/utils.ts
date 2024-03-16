import { TypedKey } from "./types";

/**
 * Creates a Symbol that defines a key and the type that the key represents.
 * @returns a typed key.
 */
export function createTypedKey<T>(): TypedKey<T> {
  return Symbol() as TypedKey<T>;
}
