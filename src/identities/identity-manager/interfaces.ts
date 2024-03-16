import { Nullable } from "@/common";

/**
 * Represents an identity manager which has to generate new ids and track the last one generated.
 */
export interface IIdentityManager<T> {
  readonly lastValue: Nullable<T>;
  newValue(): T;
}
