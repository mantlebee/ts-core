import { Nullable } from "@/common";

/**
 * Key/value storage. Values are stored as they are (in memory) or serialized
 * (web storages): implementations decide.
 */
export interface IStorage {
  /**
   * Removes every value.
   */
  clear(): void;
  /**
   * Reads a value.
   * @typeParam TValue Type of the stored value.
   * @param key Key of the value.
   * @returns the value, or `null` if missing.
   */
  get<TValue>(key: string): Nullable<TValue>;
  /**
   * Checks if a value exists.
   * @param key Key of the value.
   * @returns true if a value is stored with the given key.
   */
  has(key: string): boolean;
  /**
   * Removes a value.
   * @param key Key of the value.
   */
  remove(key: string): void;
  /**
   * Writes a value.
   * @typeParam TValue Type of the value.
   * @param key Key of the value.
   * @param value Value to store.
   */
  set<TValue>(key: string, value: TValue): void;
}

/**
 * A single value of an {@link IStorage}, bound to a fixed key.
 * @typeParam TValue Type of the stored value.
 */
export interface IStorer<TValue> {
  /**
   * Removes the value.
   */
  clear(): void;
  /**
   * Reads the value.
   * @returns the value, or `null` if missing.
   */
  get(): Nullable<TValue>;
  /**
   * Writes the value.
   * @param value Value to store.
   */
  set(value: TValue): void;
}
