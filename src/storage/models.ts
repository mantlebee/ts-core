import { Nullable } from "@/common";

import { IStorage, IStorer } from "./interfaces";

/**
 * {@link IStorer} implementation that reads and writes a single key of an
 * {@link IStorage}.
 * @typeParam TValue Type of the stored value.
 */
export class Storer<TValue> implements IStorer<TValue> {
  /**
   * @param storage Storage where the value is kept.
   * @param key Key of the value in the storage.
   */
  public constructor(
    private readonly storage: IStorage,
    private readonly key: string
  ) {}

  public clear(): void {
    this.storage.remove(this.key);
  }
  public get(): Nullable<TValue> {
    return this.storage.get(this.key);
  }
  public set(value: TValue): void {
    this.storage.set(this.key, value);
  }
}
