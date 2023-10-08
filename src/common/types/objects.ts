/**
 * Dictionary of items of the same type. A list of keys can be specified.
 * @example
 * Simple dictionary, any string key is allowed.
 * ```ts
 * const examResultsBoard: Dictionary<number> = {
 *  john: 877,
 *  jane: 931,
 *  // ...
 * }
 * ```
 * @example
 * Dictionary with specific keys only.
 * ```ts
 * const permissionsMap: Dictionary<boolean, "read" | "write"> = {
 *  read: true,
 *  write: false
 * }
 * ```
 * @param TValue Type of the item.
 * @param TKey Type of the key, default is `string`.
 */
export type Dictionary<TValue, TKey extends string = string> = {
  [key in TKey]: TValue;
};

/**
 * Key of an object.
 * @param TObject Object from which to extract the key.
 * @param TKey Type of the key, default is `string`.
 */
export type KeyOf<TObject, TKey = string> = Extract<keyof TObject, TKey>;

/**
 * Keys of an object. Value is the same of the original object or different, if specified.
 * @param TObject Object from which to extract the keys.
 * @param TValue Type of the values of the dictionary. The default is the same of the object.
 */
export type KeysOf<TObject, TValue = TObject[keyof TObject]> = {
  [TKey in keyof TObject]: TValue;
};

/**
 * Keys of an object; all keys are optional. Value is the same of the original object or different, if specified.
 * @param TObject Object from which to extract the keys.
 * @param TValue Type of the values of the dictionary. The default is the same of the object.
 */
export type OptionalKeysOf<TObject, TValue = TObject[keyof TObject]> = {
  [TKey in keyof TObject]?: TValue;
};
