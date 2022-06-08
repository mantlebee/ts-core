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
