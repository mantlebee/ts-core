import { Any, Dictionary, List } from "@/common";

import { ISmartObject } from "../interfaces";
import { isUnsafeKey } from "../nested/utils";

/**
 * Simplest {@link ISmartObject} implementation: a flat key/value store with no
 * path syntax at all. Keys are used verbatim as own properties of the wrapped
 * dictionary, which is held by reference and mutated in place.
 * @example
 * ```ts
 * const flat = new FlatObject({ a: 1 });
 * flat.get("a");        // 1
 * flat.has("b");        // false
 * flat.set("b", 2);     // { a: 1, b: 2 }
 * flat.unset("a");      // { b: 2 }
 * flat.get("a.b");      // undefined ("a.b" is a literal key, not a path)
 * flat.clear();         // {}
 * ```
 */
export class FlatObject implements ISmartObject {
  /**
   * @param obj Dictionary to read from and write to; used by reference and
   * mutated in place. Defaults to a new empty object.
   */
  public constructor(protected readonly obj: Dictionary = {}) {}

  public clear(): void {
    for (const key of this.keys()) this.unset(key);
  }
  public get<TReturn = Any>(key: string): TReturn {
    return this.has(key) ? this.obj[key] : (undefined as TReturn);
  }
  /** Only own keys count: inherited members such as `toString` are not stored values. */
  public has(key: string): boolean {
    return Object.prototype.hasOwnProperty.call(this.obj, key);
  }
  public keys(): List<string> {
    return Object.keys(this.obj);
  }
  public seed<TValue = Any>(obj: Dictionary<TValue>): void {
    for (const key of Object.keys(obj)) this.set(key, obj[key]);
  }
  /** A `__proto__` key is ignored: writing it would replace the object's prototype. */
  public set<TValue = Any>(key: string, value: TValue): void {
    if (isUnsafeKey(key)) return;
    this.obj[key] = value;
  }
  public unset(key: string): void {
    delete this.obj[key];
  }
}
