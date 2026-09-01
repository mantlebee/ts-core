import { Any } from "@/common";

/**
 * Read/write access to a nested plain object through string paths
 * (e.g. `"user.address.city"` or `"items.0.id"`), instead of manual property
 * chains and existence checks.
 */
export interface INestedObject {
  /**
   * Reads the value at a path.
   * @typeParam TReturn Expected type of the value; not checked at runtime.
   * @param path Separator-delimited path to the value.
   * @returns the value at `path`, or `undefined` if any segment along the way
   * is missing or not traversable.
   */
  get<TReturn = Any>(path: string): TReturn;
  /**
   * Tells whether the final key of a path physically exists on its parent,
   * regardless of the value stored there (an explicit `undefined` still counts).
   * @param path Separator-delimited path to check.
   * @returns true when the key exists.
   */
  has(path: string): boolean;
  /**
   * Writes a value at a path. Whether missing or conflicting intermediate
   * segments are created/replaced depends on the instance options.
   * @typeParam TValue Type of the value to write.
   * @param path Separator-delimited path to write to.
   * @param value Value to store at `path`.
   */
  set<TValue = Any>(path: string, value: TValue): void;
  /**
   * Deletes the value at a path; does nothing when the path cannot be traversed.
   * @param path Separator-delimited path to delete.
   */
  unset(path: string): void;
}
