import { Any, Dictionary } from "@/common";

import { ISmartObject } from "../interfaces";
import { NestedObjectOptions } from "./types";
import {
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

  public get<TReturn = Any>(path: string): TReturn {
    return getNestedPropertyValue(this.obj, path, this.options);
  }
  public has(path: string): boolean {
    return hasNestedProperty(this.obj, path, this.options);
  }
  public set<TValue = Any>(path: string, value: TValue): void {
    setNestedPropertyValue(this.obj, path, value, this.options);
  }
  public unset(path: string): void {
    unsetNestedProperty(this.obj, path, this.options);
  }
}
