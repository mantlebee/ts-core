import { Dictionary, KeyOf, List, Nullable } from "@/common";
import { generateRandomNumber } from "./numbers";

/**
 * Extracts a random item from a list of items.
 * @param items Items from which to extract a random one.
 * @returns a random item from a list.
 */
export function extractRandomItem<TItem>(items: List<TItem>): TItem {
  if (items.length === 1) return items[0];
  const randomIndex = generateRandomNumber(items.length - 1);
  return items[randomIndex];
}

/**
 * Looks for and returns an item in a list or a default on if no item is found.
 * ```javascript
 * firstOrDefault([1, 2, 3], a => a === 1)      // 1
 * firstOrDefault([1, 2, 3], a => a === 4)      // null
 * firstOrDefault([1, 2, 3], a => a === 4, 5)   // 5
 * ```
 * @param list List where to look for.
 * @param delegate Function to find the item.
 * @param defaultItem Item used as default value if no item is found.
 * @returns the found item or the default provided.
 */
export function firstOrDefault<T>(
  list: List<T>,
  delegate: (a: T) => boolean,
  defaultItem: Nullable<T> = null
): Nullable<T> {
  return list.find(delegate) || defaultItem;
}

/**
 * Creates a dictionary from the given items, using the item[key] value as key of the dictionary.
 * ```javascript
 * const list = [{id: 1, name: "John"}, {id: 2, name: "Jane"}]
 * listToDictionary(list, "id")
 * // {
 * //   1: {id: 1, name: "John"},
 * //   2: {id: 2, name: "Jane"}
 * // }
 * ```
 * @param list Items to map.
 * @param key Key of the item to use as dictionary key.
 * @returns a dictionary where the key is the value of item[key] and the value is the item
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
