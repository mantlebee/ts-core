import { Any, Nullable } from "@/common";

import { ICache } from "../interfaces";

/**
 * {@link ICache} that keeps the values in memory. Falsy values (`0`, `""`,
 * `false`) are cached like any other value.
 * @typeParam TValue Type of the cached values.
 * @typeParam TKey Type of the keys, default `string`.
 */
export class InMemoryCache<
  TValue = Any,
  TKey extends string | number | symbol = string,
> implements ICache<TValue, TKey> {
  private readonly _db = new Map<TKey, TValue>();

  public clear(key: TKey): void {
    this._db.delete(key);
  }
  public exists(key: TKey): boolean {
    return this._db.has(key);
  }
  public read(key: TKey): Nullable<TValue> {
    return this._db.has(key) ? (this._db.get(key) as TValue) : null;
  }
  public write(key: TKey, value: TValue): void {
    this._db.set(key, value);
  }
}
