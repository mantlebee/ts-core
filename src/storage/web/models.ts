import { Nullable } from "@/common";

import { IStorage } from "../interfaces";

/**
 * {@link IStorage} backed by a Web Storage (`localStorage`, `sessionStorage`).
 * Values are serialized as JSON. The Web Storage is resolved lazily, on every
 * call, so instances can be created where it doesn't exist (e.g. SSR).
 */
export class WebStorage implements IStorage {
  /**
   * @param getStorage Returns the Web Storage to use.
   */
  public constructor(private readonly getStorage: () => Storage) {}

  public clear(): void {
    this.getStorage().clear();
  }
  /**
   * Reads and deserializes a value. Values that are not valid JSON (not
   * written by this class) are treated as missing.
   */
  public get<TValue>(key: string): Nullable<TValue> {
    const value = this.getStorage().getItem(key);
    if (value === null) return null;
    try {
      return JSON.parse(value);
    } catch {
      return null;
    }
  }
  public has(key: string): boolean {
    return this.getStorage().getItem(key) !== null;
  }
  public remove(key: string): void {
    this.getStorage().removeItem(key);
  }
  public set<TValue>(key: string, value: TValue): void {
    this.getStorage().setItem(key, JSON.stringify(value));
  }
}

/**
 * {@link WebStorage} backed by `localStorage`. Browser only.
 */
export class LocalStorage extends WebStorage {
  public constructor() {
    super(() => localStorage);
  }
}

/**
 * {@link WebStorage} backed by `sessionStorage`. Browser only.
 */
export class SessionStorage extends WebStorage {
  public constructor() {
    super(() => sessionStorage);
  }
}
