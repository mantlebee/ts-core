import { Any } from "./data";

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
 * @typeParam TValue Type of the item.
 * @typeParam TKey Type of the key, default is `string`.
 */
export type Dictionary<
  TValue = Any,
  TKey extends number | string | symbol = string,
> = Record<TKey, TValue>;

/**
 * Key of an object.
 * @typeParam TObject Object from which to extract the key.
 * @typeParam TKey Type of the key, default is `string`.
 */
export type KeyOf<TObject, TKey = string> = Extract<keyof TObject, TKey>;

/**
 * Keys of an object. Value is the same of the original object or different, if specified.
 * @typeParam TObject Object from which to extract the keys.
 * @typeParam TValue Type of the values of the dictionary. The default is the same of the object.
 */
export type KeysOf<TObject, TValue = TObject[keyof TObject]> = {
  [TKey in keyof TObject]: TValue;
};

/**
 * Keys of an object; all keys are optional. Value is the same of the original object or different, if specified.
 * @typeParam TObject Object from which to extract the keys.
 * @typeParam TValue Type of the values of the dictionary. The default is the same of the object.
 */
export type OptionalKeysOf<TObject, TValue = TObject[keyof TObject]> = {
  [TKey in keyof TObject]?: TValue;
};

/**
 * Same as the given object, but a with a specific property required,
 * instead of optional.
 * @typeParam TObject Object to simulate.
 * @typeParam TKey Object's optional key that become required.
 */
export type WithRequiredKey<TObject, TKey extends keyof TObject> = TObject & {
  [Property in TKey]-?: TObject[Property];
};
