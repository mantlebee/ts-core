import { Any, Dictionary } from "@/common";

import { ISmartObject } from "../interfaces";

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
 * ```
 */
export class FlatObject implements ISmartObject {
  /**
   * @param obj Dictionary to read from and write to; used by reference and
   * mutated in place. Defaults to a new empty object.
   */
  public constructor(protected readonly obj: Dictionary = {}) {}

  public get<TReturn = Any>(key: string): TReturn {
    return this.obj[key];
  }
  public has(key: string): boolean {
    return key in this.obj;
  }
  public set<TValue = Any>(key: string, value: TValue): void {
    this.obj[key] = value;
  }
  public unset(key: string): void {
    delete this.obj[key];
  }
}
