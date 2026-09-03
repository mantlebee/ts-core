import { Any, Dictionary, Nullable } from "@/common";

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
 * The dictionary passed to the constructor — and every parent version — is
 * treated as read-only and never mutated. A version shares its parent's data
 * for free until the first {@link set} / {@link unset}, at which point it takes
 * a private deep copy and works on that. {@link clone} forks a new version
 * layered on the current one; the fork also stays copy-free until it is written
 * to.
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
   * @param obj Base dictionary; read-only through this class and never mutated.
   * @param getSmartObject Factory that wraps a dictionary in the concrete
   * {@link ISmartObject} implementation to use.
   * @param parent Version this one was {@link clone}d from, if any.
   */
  public constructor(
    protected readonly obj: Dictionary = {},
    protected readonly getSmartObject: SmartObjectFactory,
    protected readonly parent?: ImmutableObject,
  ) {}

  /**
   * Forks a new version layered on this one. The fork shares this version's data
   * until it is itself written to.
   */
  public clone(): ImmutableObject {
    return new ImmutableObject(this.obj, this.getSmartObject, this);
  }

  public get<TReturn = Any>(path: string): TReturn {
    return this.reader().get<TReturn>(path);
  }
  public has(path: string): boolean {
    return this.reader().has(path);
  }
  public set<TValue = Any>(path: string, value: TValue): void {
    this.writer().set(path, value);
  }
  public unset(path: string): void {
    this.writer().unset(path);
  }

  /** The plain object this version currently represents. */
  protected snapshot(): Dictionary {
    return this.copy ?? this.inherited();
  }
  /** The object carried over from the parent version, or the original base. */
  protected inherited(): Dictionary {
    return this.parent ? this.parent.snapshot() : this.obj;
  }
  /** A read-only view over the current snapshot. */
  protected reader(): ISmartObject {
    return this.getSmartObject(this.snapshot());
  }
  /** A writable view; takes this version's private copy on first use. */
  protected writer(): ISmartObject {
    if (!this.copy) this.copy = deepClone(this.inherited());
    return this.getSmartObject(this.copy);
  }
}
