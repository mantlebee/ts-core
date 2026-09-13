import { Any, Dictionary, List } from "@/common";

import { ISmartObject } from "../interfaces";
import { NestedObjectOptions } from "./types";
import {
  getNestedPropertyEntries,
  getNestedPropertyKeys,
  getNestedPropertyValue,
  hasNestedProperty,
  setNestedPropertyValue,
  unsetNestedProperty,
} from "./utils";

/**
 * Default {@link ISmartObject} implementation. It works directly on the wrapped
 * dictionary (held by reference, never cloned), so reads always reflect the
 * current data and writes mutate it in place.
 * @example
 * ```ts
 * const nested = new NestedObject({ user: { name: "John" } });
 * nested.get("user.name");        // "John"
 * nested.has("user.age");         // false
 * nested.set("user.name", "Jane"); // { user: { name: "Jane" } }
 *
 * const deep = new NestedObject({}, { createIfMissing: true });
 * deep.set("a.b.0.c", 1);         // { a: { b: [ { c: 1 } ] } }
 *
 * nested.keys();                  // ["user.name"] — leaf paths, not top-level keys
 * nested.clear();                 // {}
 * ```
 */
export class NestedObject implements ISmartObject {
  /**
   * @param obj Dictionary to read from and write to; used by reference and
   * mutated in place. Defaults to a new empty object.
   * @param options Path-parsing and write behaviour; see {@link NestedObjectOptions}.
   */
  public constructor(
    protected readonly obj: Dictionary = {},
    protected readonly options?: NestedObjectOptions,
  ) {}

  /**
   * Deletes every own key of the wrapped object, emptying it entirely —
   * unlike calling {@link unset} once per {@link keys} entry, this also
   * discards containers left empty by that (e.g. `{ a: {} }`).
   */
  public clear(): void {
    for (const key of Object.keys(this.obj)) delete this.obj[key];
  }
  public get<TReturn = Any>(path: string): TReturn {
    return getNestedPropertyValue(this.obj, path, this.options);
  }
  public has(path: string): boolean {
    return hasNestedProperty(this.obj, path, this.options);
  }
  /**
   * Unlike {@link FlatObject.keys}, this returns the path to every leaf value
   * reachable in the wrapped object (e.g. `{ user: { name: "John" } }` →
   * `["user.name"]`), not the object's top-level keys — consistent with paths
   * being what `get`/`has`/`set`/`unset` operate on here.
   */
  public keys(): List<string> {
    return getNestedPropertyKeys(this.obj, this.options);
  }
  /**
   * Decomposes `obj` into leaf paths — the same paths {@link keys} would
   * report for it — and calls {@link set} once per leaf, so a nested `obj` is
   * spread across paths rather than stored as a single value under its
   * top-level key.
   */
  public seed<TValue = Any>(obj: Dictionary<TValue>): void {
    for (const [path, value] of getNestedPropertyEntries<TValue>(
      obj,
      this.options,
    )) {
      this.set(path, value);
    }
  }
  public set<TValue = Any>(path: string, value: TValue): void {
    setNestedPropertyValue(this.obj, path, value, this.options);
  }
  public unset(path: string): void {
    unsetNestedProperty(this.obj, path, this.options);
  }
}
