import { Any, Dictionary, KeyOf, List, Nullable } from "@/common";

/**
 * Checks if arg is an array.
 * What is considered an array?
 * - `[]`
 * - `new Array()`
 * What is NOT considered an array?
 * - array-like objects (`arguments`, `NodeList`, ...)
 * - typed arrays (`Int8Array`, `Uint8Array`, ...)
 * - anything else (objects, strings, ...)
 * @param arg Item to check.
 * @returns true if arg is an array.
 */
export function isArray(arg: Any): boolean {
  return Array.isArray(arg);
}

/**
 * Looks for and returns an item in a list or a default one if item is not found.
 * @example
 * ```ts
 * firstOrDefault([1, 2, 3], a => a === 1)      // 1
 * firstOrDefault([1, 2, 3], a => a === 4)      // null
 * firstOrDefault([1, 2, 3], a => a === 4, 5)   // 5
 * ```
 * @typeParam T Type of the list items.
 * @param list List where to look for the item.
 * @param delegate Function to find the item.
 * @param defaultItem Item used as default value if item is not found.
 * @returns the found item or the default one provided.
 */
export function firstOrDefault<T>(
  list: List<T>,
  delegate: (a: T) => boolean,
  defaultItem: Nullable<T> = null
): Nullable<T> {
  const index = list.findIndex(delegate);
  return index < 0 ? defaultItem : list[index];
}

/**
 * Returns the only item of a list, or `null` when the list is empty or has more
 * than one item.
 * @example
 * ```ts
 * getFirstItemIfSingle([1])      // 1
 * getFirstItemIfSingle([])       // null
 * getFirstItemIfSingle([1, 2])   // null
 * ```
 * @typeParam T Type of the list items.
 * @param list List to check.
 * @returns the single item of the list or `null`.
 */
export function getFirstItemIfSingle<T>(list: List<T>): Nullable<T> {
  return list.length === 1 ? list[0] : null;
}

/**
 * Creates a dictionary from the given items, using the item[key] value as key of the dictionary.
 * @example
 * ```ts
 * const list = [{id: 1, name: "John"}, {id: 2, name: "Jane"}]
 * listToDictionary(list, "id")
 * // {
 * //   1: {id: 1, name: "John"},
 * //   2: {id: 2, name: "Jane"}
 * // }
 * ```
 * @typeParam T Type of the list items.
 * @param list Items to map.
 * @param key Key of the item to use as dictionary key.
 * @returns a dictionary where the key is the value of item[key] and the value is the item itself.
 */
export function listToDictionary<T>(
  list: List<T>,
  key: KeyOf<T>
): Dictionary<T> {
  return list.reduce((result, current) => {
    const mapKey = `${current[key]}`;
    result[mapKey] = current;
    return result;
  }, {} as Dictionary<T>);
}

/**
 * Replaces all the list items with new items. Useful when the array instance can not change.
 * @example
 * ```ts
 * const list = [1, 2, 3]
 * const listRef = list
 * replaceListItems(list, [4, 5, 6])
 * // listRef is [4, 5, 6]
 * ```
 * @typeParam T Type of the list items.
 * @param list Instance with items to replace.
 * @param items Items to replace.
 */
export function replaceListItems<T>(list: List<T>, items: List<T>): void {
  list.splice(0, list.length, ...items);
}

/**
 * Sorts a list **in place** by the value of one of its item keys. Values are
 * compared as case-insensitive strings, with `localeCompare`, so numbers are
 * sorted lexicographically (`"10"` comes before `"9"`).
 * @example
 * ```ts
 * const list = [{ name: "b" }, { name: "A" }]
 * sortListByKey(list, "name")
 * // list is [{ name: "A" }, { name: "b" }]
 * ```
 * @typeParam T Type of the list items.
 * @param list List to sort.
 * @param key Key of the item whose value is compared.
 */
export function sortListByKey<T>(list: List<T>, key: KeyOf<T>): void {
  const getValue = (item: T) => `${item[key]}`.toLowerCase();
  list.sort((a, b) => getValue(a).localeCompare(getValue(b)));
}
