import { Nullable } from "@/common";

export interface IIdentityManager<T> {
  readonly lastValue: Nullable<T>;
  newValue(): T;
}
