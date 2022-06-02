/**
 * Dictionary of items.
 * @param T Item.
 */
export type Dictionary<T> = {
  [key: string]: T;
};
/**
 * Key of an object.
 * @param TObject Object from which to extract the key.
 * @param TKey Type of the key, default is `string`.
 */
export type KeyOf<TObject, TKey = string> = Extract<keyof TObject, TKey>;
/**
 * Keys of an object.
 * @param TObject Object from which to extract the keys.
 */
export type KeysOf<TObject> = {
  [TKey in keyof TObject]: TObject[TKey];
};
/**
 * Keys of an object; all keys are optional.
 * @param TObject Object from which to extract the keys.
 */
export type OptionalKeysOf<TObject> = {
  [TKey in keyof TObject]?: TObject[TKey];
};
