import { Any } from "@/common";

/**
 * The whole "smart object" contract: read, probe, write and remove a value by
 * key. Every implementation in this folder ({@link FlatObject},
 * {@link NestedObject}, {@link ImmutableObject}) exposes exactly these four
 * methods and nothing more.
 *
 * It is intentionally a small, dumb concept. What a `key` means is left entirely
 * to the implementation — a literal property name for {@link FlatObject}, a
 * separator-delimited path for {@link NestedObject}, and so on — so callers can
 * swap one implementation for another without changing their code, and a wrapper
 * can layer behaviour on top (immutability, copy-on-write, validation, logging,
 * change events, access control…) by holding another `ISmartObject` and
 * forwarding these same four calls. Keeping the surface this narrow is what
 * makes that encapsulation cheap; richer needs (enumerating keys, merging,
 * transactions) belong in a wider interface built on top, not here.
 */
export interface ISmartObject {
  /**
   * Reads the value stored at `key`.
   * @typeParam TReturn Expected type of the value; not checked at runtime.
   * @param key Key to read; its shape is defined by the implementation.
   * @returns the value at `key`, or `undefined` when there is none.
   */
  get<TReturn = Any>(key: string): TReturn;
  /**
   * Tells whether a value is stored at `key`.
   * @param key Key to probe.
   * @returns true when `key` is present.
   */
  has(key: string): boolean;
  /**
   * Writes `value` at `key`.
   * @typeParam TValue Type of the value to write.
   * @param key Key to write to.
   * @param value Value to store.
   */
  set<TValue = Any>(key: string, value: TValue): void;
  /**
   * Removes whatever is stored at `key`; a no-op when `key` is absent.
   * @param key Key to remove.
   */
  unset(key: string): void;
}
