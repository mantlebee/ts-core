import { Any, Dictionary, List } from "@/common";

/**
 * The whole "smart object" contract: read, probe, write, remove, enumerate and
 * seed values by key. Every implementation in this folder ({@link FlatObject},
 * {@link NestedObject}, {@link ImmutableObject}) exposes exactly these six
 * methods and nothing more.
 *
 * It is intentionally a small, dumb concept. What a `key` means is left entirely
 * to the implementation — a literal property name for {@link FlatObject}, a
 * separator-delimited path for {@link NestedObject}, and so on — so callers can
 * swap one implementation for another without changing their code, and a wrapper
 * can layer behaviour on top (immutability, copy-on-write, validation, logging,
 * change events, access control…) by holding another `ISmartObject` and
 * forwarding these same calls. Keeping the surface this narrow is what makes
 * that encapsulation cheap; richer needs (merging, transactions) belong in a
 * wider interface built on top, not here.
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
   * Lists the keys currently held. What counts as a "key" is defined by the
   * implementation, the same way it is for {@link get}/{@link has}/{@link set}.
   * @returns the object's keys.
   */
  keys(): List<string>;
  /**
   * Writes every key/value pair found in `obj` via {@link set}. What counts as
   * a "key" — and whether a nested value is decomposed into deeper keys or
   * stored as-is — is defined by the implementation, the same way it is for
   * {@link get}/{@link has}/{@link keys}/{@link set}.
   * @typeParam TValue Type of the values being written.
   * @param obj Dictionary of key/value pairs to write.
   */
  seed<TValue = Any>(obj: Dictionary<TValue>): void;
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
