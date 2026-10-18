import { KeyOf } from "@/common";

/**
 * Global values, one per property of `TModel`, saved in a storage.
 * @typeParam TModel Shape of the global values.
 */
export interface IGlobalsStore<TModel> {
  /**
   * Reads the value of a property.
   * @param property Property to read.
   * @param defaultValue Value returned when the property is missing (`null` or `undefined`).
   * @returns the stored value or the default one.
   */
  getValue<TValue extends TModel[KeyOf<TModel>]>(
    property: KeyOf<TModel>,
    defaultValue?: TValue
  ): TValue;
  /**
   * Writes the value of a property.
   * @param property Property to write.
   * @param value Value to store.
   */
  setValue<TValue extends TModel[KeyOf<TModel>]>(
    property: KeyOf<TModel>,
    value: TValue
  ): void;
}
