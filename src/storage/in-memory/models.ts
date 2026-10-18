import { Nullable } from "@/common";

import { IStorage } from "../interfaces";
import { Storer } from "../models";

/**
 * {@link IStorage} that keeps the values in memory, as they are (no
 * serialization). Values are lost when the instance is garbage collected.
 */
export class InMemoryStorage implements IStorage {
  private readonly _data = new Map<string, unknown>();

  public clear(): void {
    this._data.clear();
  }
  public get<TValue>(key: string): Nullable<TValue> {
    return this._data.has(key) ? (this._data.get(key) as TValue) : null;
  }
  public has(key: string): boolean {
    return this._data.has(key);
  }
  public remove(key: string): void {
    this._data.delete(key);
  }
  public set<TValue>(key: string, value: TValue): void {
    this._data.set(key, value);
  }
}

/**
 * {@link Storer} backed by its own {@link InMemoryStorage}.
 * @typeParam TValue Type of the stored value.
 */
export class InMemoryStorer<TValue> extends Storer<TValue> {
  public constructor() {
    super(new InMemoryStorage(), "0");
  }
}
