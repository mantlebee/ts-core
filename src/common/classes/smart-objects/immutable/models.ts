import { Any, Dictionary, List, Nullable } from "@/common";

import { ISmartObject } from "../interfaces";
import { deepClone } from "./utils";

/**
 * Builds an {@link ISmartObject} view over a plain dictionary. It is the only
 * thing an {@link ImmutableObject} needs to know about the concrete
 * {@link ISmartObject} implementation.
 */
export type SmartObjectFactory = (obj: Dictionary) => ISmartObject;

/**
 * Immutable {@link ISmartObject} built on the copy-on-write pattern.
 *
 * The dictionary passed to the constructor is treated as read-only and never
 * mutated. A version shares that data for free until the first {@link set} /
 * {@link unset}, at which point it takes a private deep copy and works on that.
 * {@link clone} forks a new version from the current data; the fork also stays
 * copy-free until it is written to, and writes made to either version after the
 * fork are never visible to the other one.
 *
 * The class delegates every path operation (`get` / `has` / `set` / `unset`) to
 * an {@link ISmartObject} produced by the injected {@link SmartObjectFactory},
 * so it works with any implementation and never assumes a path syntax of its
 * own.
 * @example
 * ```ts
 * const factory = (obj: Dictionary) =>
 *   new NestedObject(obj, { createIfMissing: true });
 * const base = { user: { name: "John", role: "admin" } };
 *
 * const v1 = new ImmutableObject(base, factory);
 * const v2 = v1.clone();
 * v2.set("user.name", "Jane");
 *
 * v2.get("user.name");   // "Jane"
 * v2.get("user.role");   // "admin" (untouched keys carried over)
 * v1.get("user.name");   // "John"  (previous version unchanged)
 * base.user.name;        // "John"  (input never mutated)
 * ```
 * @remarks
 * The private copy is a whole-object deep clone taken on the first write, not a
 * path-level overlay. This keeps the class fully generic (it needs no knowledge
 * of the path separator to merge partial branches) at the cost of an O(size)
 * copy the first time a version is mutated.
 */
export class ImmutableObject implements ISmartObject {
  /** This version's private working copy; `null` until the first write. */
  protected copy: Nullable<Dictionary> = null;
  /**
   * `true` once {@link copy} has been handed to a fork by {@link clone}: from
   * then on it is read-only too, and the next write takes a fresh copy.
   */
  protected isCopyShared = false;

  /**
   * @param obj Base dictionary; read-only through this class and never mutated.
   * @param getSmartObject Factory that wraps a dictionary in the concrete
   * {@link ISmartObject} implementation to use.
   */
  public constructor(
    protected readonly obj: Dictionary = {},
    protected readonly getSmartObject: SmartObjectFactory,
  ) {}

  /**
   * Forks a new version from this one's current data. The fork shares that data
   * until either version is written to, and the two versions never see each
   * other's later writes.
   */
  public clone(): ImmutableObject {
    if (this.copy) this.isCopyShared = true;
    return new ImmutableObject(this.snapshot(), this.getSmartObject);
  }

  public clear(): void {
    this.writer().clear();
  }
  public get<TReturn = Any>(path: string): TReturn {
    return this.reader().get<TReturn>(path);
  }
  public has(path: string): boolean {
    return this.reader().has(path);
  }
  public keys(): List<string> {
    return this.reader().keys();
  }
  public seed<TValue = Any>(obj: Dictionary<TValue>): void {
    this.writer().seed(obj);
  }
  public set<TValue = Any>(path: string, value: TValue): void {
    this.writer().set(path, value);
  }
  public unset(path: string): void {
    this.writer().unset(path);
  }

  /** The plain object this version currently represents. */
  protected snapshot(): Dictionary {
    return this.copy ?? this.obj;
  }
  /** A read-only view over the current snapshot. */
  protected reader(): ISmartObject {
    return this.getSmartObject(this.snapshot());
  }
  /**
   * A writable view; takes a private copy on the first write, and again after
   * the current copy has been shared with a fork.
   */
  protected writer(): ISmartObject {
    if (!this.copy || this.isCopyShared) {
      this.copy = deepClone(this.snapshot());
      this.isCopyShared = false;
    }
    return this.getSmartObject(this.copy);
  }
}
