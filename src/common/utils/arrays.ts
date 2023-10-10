import { Delegate, Dictionary, KeyOf, List, Nullable } from "@/common";

/**
 * Looks for and returns an item in a list or a default one if item is not found.
 * @example
 * ```ts
 * firstOrDefault([1, 2, 3], a => a === 1)      // 1
 * firstOrDefault([1, 2, 3], a => a === 4)      // null
 * firstOrDefault([1, 2, 3], a => a === 4, 5)   // 5
 * ```
 * @param list List where to look for the item.
 * @param delegate Function to find the item.
 * @param defaultItem Item used as default value if item is not found.
 * @returns the found item or the default one provided.
 */
export function firstOrDefault<T>(
  list: List<T>,
  delegate: Delegate<boolean, T>,
  defaultItem: Nullable<T> = null
): Nullable<T> {
  return list.find(delegate) || defaultItem;
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
 * @param list Items to map.
 * @param key Key of the item to use as dictionary key.
 * @returns a dictionary where the key is the value of item[key] and the value is the item itself
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
 * Replaces all the list items with new items. Usefull when the array instance can not change.
 * ```ts
 * const list = [1, 2, 3]
 * const listRef = list
 * replaceListItems(list, [4, 5, 6])
 * // listRef is [4, 5, 6]
 * ```
 * @param list Instance with items to replace.
 * @param items Items to replace.
 */
export function replaceListItems<T>(list: List<T>, items: List<T>): void {
  list.splice(0, list.length, ...items);
}
