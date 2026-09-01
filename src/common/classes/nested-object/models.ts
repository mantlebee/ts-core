import { Any, Dictionary } from "@/common";

import { INestedObject } from "./interfaces";
import { NestedObjectOptions } from "./types";
import {
  getDataValue,
  hasDataValue,
  setDataValue,
  unsetDataValue,
} from "./utils";

/**
 * Default {@link INestedObject} implementation. It works directly on the wrapped
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
export class NestedObject implements INestedObject {
  /**
   * @param data Dictionary to read from and write to; used by reference and
   * mutated in place. Defaults to a new empty object.
   * @param options Path-parsing and write behaviour; see {@link NestedObjectOptions}.
   */
  public constructor(
    protected readonly data: Dictionary = {},
    protected readonly options?: NestedObjectOptions,
  ) {}

  /**
   * Reads the value at a path.
   * @typeParam TReturn Expected type of the value; not checked at runtime.
   * @param path Path split on {@link pathSeparator}.
   * @returns the value at `path`, or `undefined` if a segment is missing or not
   * traversable.
   */
  public get<TReturn = Any>(path: string): TReturn {
    return getDataValue(this.data, path, this.pathSeparator);
  }
  /**
   * Tells whether the final key of a path physically exists on its parent
   * (an explicit `undefined` still counts as present).
   * @param path Path split on {@link pathSeparator}.
   * @returns true when the key exists.
   */
  public has(path: string): boolean {
    return hasDataValue(this.data, path, this.pathSeparator);
  }
  /**
   * Writes a value at a path. Missing intermediate segments are created only
   * when {@link createIfMissing} is set; existing non-traversable ones are
   * replaced only when {@link replaceIfExists} is set — otherwise the data is
   * left untouched. A numeric segment creates an array, any other creates an
   * object.
   * @typeParam TValue Type of the value to write.
   * @param path Path split on {@link pathSeparator}.
   * @param value Value to store at `path`.
   */
  public set<TValue = Any>(path: string, value: TValue): void {
    setDataValue(
      this.data,
      path,
      value,
      this.pathSeparator,
      this.createIfMissing,
      this.replaceIfExists,
    );
  }
  /**
   * Deletes the value at a path; does nothing when the path cannot be traversed.
   * @param path Path split on {@link pathSeparator}.
   */
  public unset(path: string): void {
    unsetDataValue(this.data, path, this.pathSeparator);
  }

  /** Resolved {@link NestedObjectOptions.createIfMissing}; `false` by default. */
  protected get createIfMissing(): boolean {
    return Boolean(this.options?.createIfMissing);
  }
  /** Resolved {@link NestedObjectOptions.pathSeparator}; `"."` by default. */
  protected get pathSeparator(): string {
    return this.options?.pathSeparator ?? ".";
  }
  /** Resolved {@link NestedObjectOptions.replaceIfExists}; `false` by default. */
  protected get replaceIfExists(): boolean {
    return Boolean(this.options?.replaceIfExists);
  }
}
