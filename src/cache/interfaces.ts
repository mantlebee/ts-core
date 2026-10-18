import { Any, Nullable } from "@/common";

/**
 * Key/value cache.
 * @typeParam TValue Type of the cached values.
 * @typeParam TKey Type of the keys, default `string`.
 */
export interface ICache<
  TValue = Any,
  TKey extends string | number | symbol = string,
> {
  /**
   * Removes a value.
   * @param key Key of the value.
   */
  clear(key: TKey): void;
  /**
   * Checks if a value is cached.
   * @param key Key of the value.
   * @returns true if a (valid) value is cached for the key.
   */
  exists(key: TKey): boolean;
  /**
   * Reads a value.
   * @param key Key of the value.
   * @returns the cached value, or `null` if missing.
   */
  read(key: TKey): Nullable<TValue>;
  /**
   * Writes a value.
   * @param key Key of the value.
   * @param value Value to cache.
   */
  write(key: TKey, value: TValue): void;
}
