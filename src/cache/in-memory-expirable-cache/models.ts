import { Any, Nullable } from "@/common";

import { InMemoryCache } from "../in-memory-cache";
import { ICache } from "../interfaces";

/**
 * {@link ICache} whose values expire after a number of seconds from their last
 * write. Expired values are removed lazily, when they are accessed.
 * @typeParam TValue Type of the cached values.
 * @typeParam TKey Type of the keys, default `string`.
 */
export class InMemoryExpirableCache<
  TValue = Any,
  TKey extends string | number | symbol = string,
> implements ICache<TValue, TKey> {
  private readonly _expirations = new InMemoryCache<number, TKey>();

  /**
   * @param expiresAfter Seconds of validity of each value, renewed on every
   * write (`0` means no expiration).
   * @param cache Cache where the values are stored.
   */
  public constructor(
    private readonly expiresAfter: number,
    private readonly cache: ICache<TValue, TKey> = new InMemoryCache<
      TValue,
      TKey
    >()
  ) {}

  public clear(key: TKey): void {
    this._expirations.clear(key);
    this.cache.clear(key);
  }
  public exists(key: TKey): boolean {
    this.clearIfExpired(key);
    return this.cache.exists(key);
  }
  public read(key: TKey): Nullable<TValue> {
    this.clearIfExpired(key);
    return this.cache.read(key);
  }
  public write(key: TKey, value: TValue): void {
    if (this.expiresAfter)
      this._expirations.write(key, Date.now() + this.expiresAfter * 1000);
    else this._expirations.clear(key);
    this.cache.write(key, value);
  }

  private clearIfExpired(key: TKey): void {
    const expiration = this._expirations.read(key);
    if (expiration !== null && Date.now() > expiration) this.clear(key);
  }
}
