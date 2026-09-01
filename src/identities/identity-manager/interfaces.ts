import { Nullable } from "@/common";

/**
 * Represents an identity manager which has to generate new ids and track the last one generated.
 * @typeParam T Type of the generated ids.
 */
export interface IIdentityManager<T> {
  /** The last generated id, or `null` when none has been generated yet. */
  readonly lastValue: Nullable<T>;
  /**
   * Generates the next id and records it as {@link lastValue}.
   * @returns the newly generated id.
   */
  newValue(): T;
}
