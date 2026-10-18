import { KeyOf } from "@/common";

import { IStorage } from "../interfaces";
import { Storer } from "../models";
import { SessionStorage } from "../web";
import { IGlobalsStore } from "./interfaces";

/**
 * Creates a store of global values, one per property of `TModel`, all saved
 * together under the key `id`.
 * @example
 * ```ts
 * const globals = createGlobalsStore<{ theme: string }>("globals");
 * globals.setValue("theme", "dark");
 * globals.getValue("theme", "light"); // "dark"
 * ```
 * @typeParam TModel Shape of the global values.
 * @param id Key of the values in the storage.
 * @param storage Storage to use, default {@link SessionStorage}.
 * @returns the store.
 */
export function createGlobalsStore<TModel>(
  id: string,
  storage: IStorage = new SessionStorage()
): IGlobalsStore<TModel> {
  const storer = new Storer<TModel>(storage, id);
  const getValue = <TValue extends TModel[KeyOf<TModel>]>(
    property: KeyOf<TModel>,
    defaultValue?: TValue
  ) => {
    const value = storer.get()?.[property] as TValue | null | undefined;
    return value ?? (defaultValue as TValue);
  };
  const setValue = <TValue extends TModel[KeyOf<TModel>]>(
    property: KeyOf<TModel>,
    value: TValue
  ) => {
    const data = storer.get() || ({} as TModel);
    data[property] = value;
    storer.set(data);
  };
  return { getValue, setValue };
}
